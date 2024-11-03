export type MediaStream = { mediaMin: number, mediaMax: number };
export type EventHandler = (...args: unknown[]) => void

export class WindowMedia {
  private static instance: WindowMedia;

  public static getInstance(): WindowMedia {
    return (this.instance ??= new WindowMedia());
  }

  private constructor() { }

  private medias = new Map<string, MediaStream>();
  private defaultMediaKey: string | undefined;

  public add(key: string, mediaMin: number, mediaMax: number): void {
    if (mediaMin >= mediaMax) {
      throw new Error('mediaMin must be less than mediaMax');
    }
    this.medias.set(key, { mediaMin, mediaMax });
  }

  public getMedias(): Map<string, MediaStream> {
    return this.medias
  }

  public setDefaultMediaKey(key: string): void {
    this.defaultMediaKey = key;
  }

  public getDefaultMediaKey(): string | undefined {
    return this.defaultMediaKey;
  }

}
export class ConfigureWindowMedia {
  private static instance: ConfigureWindowMedia;

  public static getInstance(): ConfigureWindowMedia {
    return (this.instance ??= new ConfigureWindowMedia());
  }

  private constructor() { }

  public add(key: string, mediaMin: number, mediaMax: number): void {
    windowMedia.add(key, mediaMin, mediaMax)
  }

  public setDefaultMediaKey(key: string): void {
    windowMedia.setDefaultMediaKey(key)
  }

}

export const windowMedia: WindowMedia = WindowMedia.getInstance();
export const configureWindowMedia: ConfigureWindowMedia = ConfigureWindowMedia.getInstance();

export const media = new Map<string, boolean>();



