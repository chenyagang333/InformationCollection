import { defineStore } from 'pinia'
import { AddWindowMedia } from '@/hooks/useWindowMedia';
import { computed, type Ref } from 'vue';
export enum MediaTypeEnum { Mobile = 'mobile', Pc = 'pc' }

export const useMediaStore = () => defineStore('media', () => {
  const { mediaKey, screenWidth } = AddWindowMedia(configMedias => {
    configMedias.add(MediaTypeEnum.Pc, 1024, Infinity)
    configMedias.add(MediaTypeEnum.Mobile, 0, 1023)
  })

  // 添加计算属性，带有类型检查
  const isMobile = computed(() => mediaKey.value === MediaTypeEnum.Mobile)
  const isPc = computed(() => mediaKey.value === MediaTypeEnum.Pc)

  return {
    mediaKey: mediaKey as Ref<MediaTypeEnum>,
    screenWidth,
    isMobile,
    isPc
  }
})();

// 可以改名为 useResponsiveValue 更符合实际用途
export const useResponsiveValue = <T>(
  configure: (data: Record<MediaTypeEnum, T>) => void
): Ref<T, T> => {
  const data = {} as Record<MediaTypeEnum, T>
  configure(data)

  const mediaStore = useMediaStore()

  return computed(() => {
    if (mediaStore.isMobile) return data.mobile
    if (mediaStore.isPc) return data.pc
    return data.mobile
  })
}



