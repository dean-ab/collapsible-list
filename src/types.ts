export type Item = FileSystemItem | BaseItem;

export interface BaseItem {
  id: string;
  title: string;
  description: string;
  childrenItems: BaseItem[];
  hasMoreChildren: boolean;
}

export type FileSysemItemType = "folder" | "video" | "audio" | "image" | "text";

export type VideoExtension = "mp4" | "mov" | "mkv";
export type AudioExtension = "mpeg" | "wav" | "mp3";
export type ImageExtension = "gif" | "png" | "jpg" | "jpeg";
export type TextExtension = "docx" | "html" | "json";

export interface FileSystemItem extends BaseItem {
  type: FileSysemItemType;
  childrenItems: FileSystemItem[];
}

export interface FolderItem extends FileSystemItem {
  type: "folder";
}

export interface VideoItem extends FileSystemItem {
  type: "video";
  ext: VideoExtension;
}

export interface AudioItem extends FileSystemItem {
  type: "audio";
  ext: AudioExtension;
}

export interface ImageItem extends FileSystemItem {
  type: "image";
  ext: ImageExtension;
}

export interface TextItem extends FileSystemItem {
  type: "text";
  ext: TextExtension;
}
