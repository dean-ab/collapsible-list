import * as React from "react";
import { Item, FileSystemItem } from "./types";
import { CollapsibleList } from "./Components/CollapsibleList";
import { hasMoreChildrenToFetch } from "./Components/CollapsibleListItem";
import {
  fetchFiles,
  isFileSystemItem,
  updateFileSystem,
} from "./Services/FileSystem";

export const FileSystem = () => {
  const [fileSystem, setFileSystem] = React.useState<FileSystemItem[]>([]);

  const onItemClick = async (item: Item) => {
    const isFSItem = isFileSystemItem(item);
    const hasChildrenToFetch = hasMoreChildrenToFetch(item);

    if (isFSItem && hasChildrenToFetch) {
      const childrenItems = await fetchFiles();
      const newItem = { ...item, childrenItems, hasMoreChildren: false };
      const mergedFileSystem = updateFileSystem(fileSystem, newItem);
      setFileSystem(mergedFileSystem);
    }
  };

  React.useEffect(() => {
    fetchFiles(50).then(setFileSystem);
  }, []);

  return <CollapsibleList items={fileSystem} onItemClick={onItemClick} />;
};
