import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./TwitterHeader.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import SearchIcon from "@mui/icons-material/Search";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
function TwitterHeader() {
  const location = useLocation();
  return (
    <Box
      sx={{
        gap: "1.5rem",
        width: "100%",
        paddingX: "1.5rem",
        height: "100%",
        bgcolor: "white",
      }}
    >
      <List>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/home">
          <TwitterIcon
            sx={{
              color: "#1DA1F2",
              fontSize: "50px",
            }}
          />
          <ListItemText />
        </ListItem>

        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/home">
          {/* <HomeIcon
            sx={{
              strokeWidth: 1,
            }}
          /> */}
          {location.pathname === "/home" ? <HomeIcon /> : <HomeOutlinedIcon />}
          <ListItemText primary="Home" className="bold-text" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/explore">
          {location.pathname === "/home" ? (
            <SearchIcon />
          ) : (
            <ZoomInRoundedIcon />
          )}
          <ListItemText primary="Explore" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/explore">
          {location.pathname === "/explore" ? (
            <NotificationsIcon />
          ) : (
            <NotificationsNoneIcon />
          )}
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/explore">
          {location.pathname === "/home" ? (
            <MailRoundedIcon />
          ) : (
            <MailOutlineIcon />
          )}

          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/favourites">
          {location.pathname === "/favourites" ? (
            <FavoriteRoundedIcon />
          ) : (
            <FavoriteBorderIcon />
          )}

          <ListItemText primary="Favourites" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/explore">
          {location.pathname === "/explore" ? (
            <PersonRoundedIcon />
          ) : (
            <PersonOutlineOutlinedIcon />
          )}
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/explore">
          {location.pathname === "/explore" ? (
            <MoreHorizRoundedIcon />
          ) : (
            <MoreVertSharpIcon />
          )}
          <ListItemText primary="More" />
        </ListItem>
      </List>
      {/* </Drawer> */}
    </Box>
  );
}

export default TwitterHeader;
