import { useDebounceFn, useEventBus } from "@vueuse/core";
import { ConfigureWindowMedia, configureWindowMedia, windowMedia } from "./internal";
import { onMounted, onUnmounted, ref } from "vue";

const windowEventBus = useEventBus<number>('windowEventBus')
const mediaEventBus = useEventBus<string>('mediaEventBus')
let isAddWindowMedia = false

/**
 * 添加窗口媒体（在全局只会调用一次）
 * @param configMedias 配置媒体
 * @param onWindowChange 窗口变化回调
 * @param onMediaChange 媒体变化回调
 */
export const AddWindowMedia = (
  configMedias: (configureWindowMedia: ConfigureWindowMedia) => void,
  onWindowChange?: (screenWidth: number) => void,
  onMediaChange?: (mediaKey: string) => void
) => {
  if (isAddWindowMedia) throw new Error('AddWindowMedia has been called');
  isAddWindowMedia = true
  configMedias(configureWindowMedia);

  const medias = windowMedia.getMedias()
  const allKeys = Array.from(medias.keys());

  const defaultMediaKey = windowMedia.getDefaultMediaKey() ?? allKeys[0]

  const getWindowMediaType = (screenWidth: number): string => {
    return allKeys.find(key => {
      const media = medias.get(key)
      if (!media) return false
      return screenWidth >= media.mediaMin && screenWidth <= media.mediaMax
    }) ?? allKeys[0]
  }

  if (onWindowChange) windowEventBus.on(onWindowChange)
  if (onMediaChange) mediaEventBus.on(onMediaChange)

  const listeningWindow = useDebounceFn(() => {
    const _screenWidth = document.body.clientWidth;
    windowEventBus.emit(_screenWidth)
    screenWidth.value = _screenWidth

    const _mediaKey = getWindowMediaType(_screenWidth);
    if (mediaKey.value === _mediaKey) return;

    mediaEventBus.emit(_mediaKey)
    mediaKey.value = _mediaKey
  }, 100);

  const mediaKey = ref<string>(defaultMediaKey)
  const screenWidth = ref(0)

  onMounted(() => {
    listeningWindow();
    const screenWidth = document.body.clientWidth;
    const mediaKey = getWindowMediaType(screenWidth);
    if (mediaKey === windowMedia.getDefaultMediaKey()) {
      windowEventBus.emit(screenWidth)
      mediaEventBus.emit(mediaKey)
    }
    window.addEventListener("resize", listeningWindow);
  })

  return { mediaKey, screenWidth }
}

export const useWindowScreenWidth = (change?: (screenWidth: number) => void) => {
  if (change) windowEventBus.on(change)
  onUnmounted(() => {
    if (change) windowEventBus.off(change)
  })
}

export const useMediaKey = (change?: (mediaKey: string) => void) => {
  if (change) mediaEventBus.on(change)
  onUnmounted(() => {
    if (change) mediaEventBus.off(change)
  })
}









