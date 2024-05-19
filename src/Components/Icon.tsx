import * as React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import VideoIcon from "@mui/icons-material/OndemandVideoRounded";
import FolderIcon from "@mui/icons-material/FolderRounded";
import TextIcon from "@mui/icons-material/InsertDriveFileRounded";
import AudioIcon from "@mui/icons-material/AudioFileRounded";
import ImageIcon from "@mui/icons-material/ImageRounded";

const ICON_COLOR: { [key in string]: string } = {
  Red: "#FF6B6B",
  Green: "#6BCB77",
  Yellow: "#FFD93D",
  Blue: "#4D96FF",
  Grey: "#595260"
};

const ICONS_STORE: {
  [key in string]: React.ComponentType<any>;
} = {
  folder: FolderIcon,
  text: TextIcon,
  video: VideoIcon,
  image: ImageIcon,
  audio: AudioIcon
};

interface Props {
  name: string;
  color: string;
}
export const Icon: React.FC<Props> = ({ name, color }) => {
  const Icon = ICONS_STORE[name];

  if (!Icon) {
    return null;
  }

  return (
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: ICON_COLOR[color] }}>
        <Icon fontSize="small" />
      </Avatar>
    </ListItemAvatar>
  );
};
