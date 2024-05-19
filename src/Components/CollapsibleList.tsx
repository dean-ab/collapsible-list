import * as React from "react";
import { Item } from "../types";
import Paper from "@mui/material/Paper";
import { CollapsibleListItem } from "./CollapsibleListItem";
import List from "@mui/material/List";

interface Props {
  items: Item[];
  onItemClick: (i: Item) => any;
  depth?: number;
}

export const CollapsibleList: React.FC<Props> = ({
  items = [],
  onItemClick = () => {},
  depth = 0
}) => {
  const hasItems = items.length > 0;
  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 460,
        margin: "0 auto"
      }}
      elevation={depth > 0 ? 0 : 3}
    >
      {hasItems ? (
        <List disablePadding>
          {items.map((item) => (
            <CollapsibleListItem
              key={item.id}
              item={item}
              onClick={onItemClick}
              depth={depth}
            />
          ))}
        </List>
      ) : null}
    </Paper>
  );
};
