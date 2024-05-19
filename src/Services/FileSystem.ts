import { v4 } from "uuid";
import { faker } from "@faker-js/faker";

import {
  Item,
  FileSystemItem,
  FileSysemItemType,
  FolderItem,
  VideoItem,
  AudioItem,
  ImageItem,
  TextItem
} from "../types";
import { randomFromList, randomNumber, sleep } from "../utils";

const FILE_TYPES = ["folder", "video", "audio", "image", "text"];
const VIDEO_EXT = ["mp4", "mov", "mkv"];
const AUDIO_EXT = ["mpeg", "wav", "mp3"];
const IMAGE_EXT = ["gif", "png", "jpg", "jpeg"];
const TEXT_EXT = ["docx", "html", "json"];

export function isFileSystemItem(item: Item): item is FileSystemItem {
  return FILE_TYPES.indexOf((item as FileSystemItem)?.type) > -1;
}

function createBaseFile() {
  return {
    id: v4(),
    hasMoreChildren: false,
    childrenItems: []
  };
}

function createFolder(): FolderItem {
  return {
    ...createBaseFile(),
    type: "folder",
    title: faker.lorem.words(2),
    description: "Directory",
    childrenItems: [],
    hasMoreChildren: true
  };
}

function createVideoFile(): VideoItem {
  const ext = randomFromList(VIDEO_EXT);
  return {
    ...createBaseFile(),
    type: "video",
    ext,
    title: faker.system.commonFileName(ext),
    description: "Video File"
  };
}

function createAudioFile(): AudioItem {
  const ext = randomFromList(AUDIO_EXT);

  return {
    ...createBaseFile(),
    type: "audio",
    ext,
    title: faker.system.commonFileName(ext),
    description: "Audio File"
  };
}

function createImageFile(): ImageItem {
  const ext = randomFromList(IMAGE_EXT);

  return {
    ...createBaseFile(),
    type: "image",
    ext,
    title: faker.system.commonFileName(ext),
    description: "Image File"
  };
}

function createTextFile(): TextItem {
  const ext = randomFromList(TEXT_EXT);

  return {
    ...createBaseFile(),
    type: "text",
    ext,
    title: faker.system.commonFileName(ext),
    description: "Text File"
  };
}

export function generateRandomFile(): FileSystemItem {
  const fileType = randomFromList(FILE_TYPES);

  switch (fileType) {
    case "folder":
      return createFolder();
    case "video":
      return createVideoFile();
    case "audio":
      return createAudioFile();
    case "image":
      return createImageFile();
    case "text":
      return createTextFile();
    default:
      return createFolder();
  }
}

const FILE_ICON_COLOR_MAPPER: { [key in FileSysemItemType]: string } = {
  folder: "Green",
  text: "Grey",
  video: "Blue",
  audio: "Yellow",
  image: "Red"
};

export function getColorOfFile(item: FileSystemItem): string {
  return FILE_ICON_COLOR_MAPPER[item.type] || "Grey";
}

export function generateRandomFiles(count?: number): FileSystemItem[] {
  const filesCount = count ?? randomNumber(5, 1);

  return [...new Array(filesCount)].map(generateRandomFile);
}

export function fetchFiles(count?: number) {
  return sleep().then(() => generateRandomFiles(count));
}

export function updateFileSystem(
  fs: FileSystemItem[],
  newItem: FileSystemItem
): FileSystemItem[] {
  return fs.map((item) =>
    item.id === newItem.id
      ? newItem
      : {
          ...item,
          childrenItems: item.childrenItems
            ? updateFileSystem(item.childrenItems, newItem)
            : item.childrenItems
        }
  );
}
