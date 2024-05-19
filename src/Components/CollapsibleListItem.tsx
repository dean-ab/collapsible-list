import * as React from "react";
import MUIListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import CircularProgress from "@mui/material/CircularProgress";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { getColorOfFile } from "../Services/FileSystem";
import { Item } from "../types";
import { CollapsibleList } from "./CollapsibleList";
import { Icon } from "./Icon";

interface Props {
  item: Item;
  onClick: (item: Item) => any;
  depth: number;
}

export function hasChildren(item: Item): boolean {
  return item.childrenItems?.length > 0 || item.hasMoreChildren;
}

export function hasMoreChildrenToFetch(item: Item): boolean {
  return item.childrenItems?.length === 0 && item.hasMoreChildren;
}

const ListItem: React.FC<any> = ({ item, onClick, depth, children }) => {
  return (
    <MUIListItem disableGutters dense>
      <ListItemButton sx={{ pl: 2 + depth * 4 }} onClick={onClick}>
        <Icon name={item.type} color={getColorOfFile(item)} />
        <ListItemText primary={item.title} secondary={item.description} />
        {children}
      </ListItemButton>
    </MUIListItem>
  );
};

const ListItemWithChildren: React.FC<Props> = ({ item, onClick, depth }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const hasRemoteChildren = hasMoreChildrenToFetch(item);

  const onListItemClick = () => {
    onClick(item);
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <ListItem item={item} depth={depth} onClick={onListItemClick}>
        {isCollapsed ? (
          <ExpandMore />
        ) : hasRemoteChildren ? (
          <CircularProgress size={20} />
        ) : (
          <ExpandLess />
        )}
      </ListItem>
      <Collapse
        in={!hasRemoteChildren && !isCollapsed}
        timeout="auto"
        unmountOnExit
      >
        <CollapsibleList
          items={item.childrenItems}
          onItemClick={onClick}
          depth={depth + 1}
        />
      </Collapse>
    </>
  );
};

export const CollapsibleListItem: React.FC<Props> = ({
  item,
  onClick,
  depth
}) => {
  return hasChildren(item) ? (
    <ListItemWithChildren item={item} onClick={onClick} depth={depth} />
  ) : (
    <ListItem item={item} depth={depth} />
  );
};
