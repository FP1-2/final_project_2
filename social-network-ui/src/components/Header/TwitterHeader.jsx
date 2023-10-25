// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// function TwitterHeader() {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" component="div">
//           Home
//         </Typography>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Explore
//         </Typography>
//         <Typography variant="h6" component="div">
//           Notifications
//         </Typography>
//         <Typography variant="h6" component="div">
//           Messages
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default TwitterHeader;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
function TwitterHeader() {
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
      <TwitterIcon />

      <List>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/home">
          <HomeIcon /> <ListItemText primary="Home" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/explore">
          <SearchIcon /> <ListItemText primary="Explore" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/explore">
          <NotificationsNoneIcon /> <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/explore">
          <MailOutlineIcon /> <ListItemText primary="Messages" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/favourites">
          <FavoriteBorderIcon /> <ListItemText primary="Favourites" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/explore">
          <PermIdentityIcon /> <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button sx={{ gap: "1rem" }} component={Link} to="/explore">
          <ListItemText primary="More" />
        </ListItem>
      </List>
      {/* </Drawer> */}
    </Box>
  );
}

export default TwitterHeader;
