import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import SearchIcon from '@mui/icons-material/Search';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import Drawer from '@mui/material/Drawer';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from '../HomePage/Post/Post.module.scss';
import PropTypes from 'prop-types';
import useUserToken from '../../hooks/useUserToken';
import getUserData from '../../api/getUserInfo';
import { useParams } from 'react-router-dom';
import useScreenSize from '../../hooks/useScreenSize';
import getUserId from '../../utils/getUserId';

function TwitterHeader() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const [open, setOpen] = useState(false);

  const screenSize = useScreenSize();

  const toggleDrawer = (isOpen) => {
    setOpen(isOpen);
  };
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  if (screenSize === 'mobile') {
    return (
      <Box
        sx={{
          gap: '1.5rem',
          width: '100%',
          paddingX: '1.5rem',
          height: '100%',
          bgcolor: 'white',
        }}
      >
        <TwitterIcon
          sx={{
            color: '#1DA1F2',
            fontSize: '50px',
            ml: '15px',
            mt: '15px',
          }}
          onClick={() => toggleDrawer(true)}
        />
        <Drawer anchor='left' open={open} onClose={() => toggleDrawer(false)}>
          <List sx={{ minWidth: '300px' }}>
            <ListItem
              button
              sx={{ gap: '1rem' }}
              component={Link}
              to='/home'
              onClick={() => handleItemClick('Home')}
            >
              {location.pathname === '/home' ? (
                <HomeIcon />
              ) : (
                <HomeOutlinedIcon />
              )}
              <ListItemText
                primary='Home'
                primaryTypographyProps={{
                  fontWeight: activeItem === 'Home' ? 800 : 'normal',
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{ gap: '1rem' }}
              component={Link}
              to='/explore'
              onClick={() => handleItemClick('Explore')}
            >
              {location.pathname === '/home' ? (
                <SearchIcon />
              ) : (
                <ZoomInRoundedIcon />
              )}
              <ListItemText
                primary='Explore'
                primaryTypographyProps={{
                  fontWeight: activeItem === 'Explore' ? 800 : 'normal',
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{ gap: '1rem' }}
              component={Link}
              to='/explore'
              onClick={() => handleItemClick('Notifications')}
            >
              {location.pathname === '/explore' ? (
                <NotificationsIcon />
              ) : (
                <NotificationsNoneIcon />
              )}
              <ListItemText
                primary='Notifications'
                primaryTypographyProps={{
                  fontWeight: activeItem === 'Notifications' ? 800 : 'normal',
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{ gap: '1rem' }}
              component={Link}
              to='/explore'
              onClick={() => handleItemClick('Messages')}
            >
              {location.pathname === '/home' ? (
                <MailRoundedIcon />
              ) : (
                <MailOutlineIcon />
              )}

              <ListItemText
                primary='Messages'
                primaryTypographyProps={{
                  fontWeight: activeItem === 'Messages' ? 800 : 'normal',
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{ gap: '1rem' }}
              component={Link}
              to='/favourites'
              onClick={() => handleItemClick('Favourites')}
            >
              {location.pathname === '/favourites' ? (
                <FavoriteRoundedIcon />
              ) : (
                <FavoriteBorderIcon />
              )}

              <ListItemText
                primary='Favourites'
                primaryTypographyProps={{
                  fontWeight: activeItem === 'Favourites' ? 800 : 'normal',
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{ gap: '1rem' }}
              component={Link}
              to='/explore'
              onClick={() => handleItemClick('Profile')}
            >
              {location.pathname === '/explore' ? (
                <PersonRoundedIcon />
              ) : (
                <PersonOutlineOutlinedIcon />
              )}
              <ListItemText
                primary='Profile'
                primaryTypographyProps={{
                  fontWeight: activeItem === 'Profile' ? 800 : 'normal',
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{ gap: '1rem' }}
              component={Link}
              to='/explore'
              onClick={() => handleItemClick('More')}
            >
              {location.pathname === '/explore' ? (
                <MoreHorizRoundedIcon />
              ) : (
                <MoreVertSharpIcon />
              )}
              <ListItemText
                primary='More'
                primaryTypographyProps={{
                  fontWeight: activeItem === 'More' ? 800 : 'normal',
                }}
              />
            </ListItem>
            <Button
              sx={{
                marginTop: '1rem',
                marginLeft: '1rem',
                paddingX: '50px',
                paddingY: '15px',
                fontWeight: 800,
                backgroundColor: '#1D9BF0',
                borderRadius: '25px',
                '@media (max-width: 1280px)': {
                  width: '40%',
                },
                '@media (max-width: 860px)': {
                  width: '50%',
                },
                '@media (max-width: 600px)': {
                  width: '80%',
                },
              }}
              variant='contained'
            >
              <DrawOutlinedIcon />
              Tweet
            </Button>
          </List>
        </Drawer>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          gap: '1.5rem',
          width: '100%',
          paddingX: '1.5rem',
          height: '100%',
          bgcolor: 'white',
        }}
      >
        <TwitterIcon
          sx={{
            color: '#1DA1F2',
            fontSize: '50px',
            ml: '15px',
            mt: '15px',
          }}
        />

        <List>
          <ListItem button sx={{ gap: '1rem' }} component={Link} to='/home'>
            {location.pathname === '/home' ? (
              <HomeIcon />
            ) : (
              <HomeOutlinedIcon />
            )}
            <ListItemText
              primary='Home'
              primaryTypographyProps={{
                fontWeight: activeItem === 'Home' ? 800 : 'normal',
                display: {
                  xs: 'none',
                  sm: 'block',
                  md: 'block',
                },
              }}
            />
          </ListItem>
          <ListItem
            button
            sx={{ gap: '1rem' }}
            component={Link}
            to='/explore'
            onClick={() => handleItemClick('Explore')}
          >
            {location.pathname === '/home' ? (
              <SearchIcon />
            ) : (
              <ZoomInRoundedIcon />
            )}
            <ListItemText
              primary='Explore'
              primaryTypographyProps={{
                fontWeight: activeItem === 'Explore' ? 800 : 'normal',
                display: {
                  xs: 'none',
                  sm: 'block',
                  md: 'block',
                },
              }}
            />
          </ListItem>
          <ListItem
            button
            sx={{ gap: '1rem' }}
            component={Link}
            to='/explore'
            onClick={() => handleItemClick('Notifications')}
          >
            {location.pathname === '/explore' ? (
              <NotificationsIcon />
            ) : (
              <NotificationsNoneIcon />
            )}
            <ListItemText
              primary='Notifications'
              primaryTypographyProps={{
                fontWeight: activeItem === 'Notifications' ? 800 : 'normal',
                display: {
                  xs: 'none',
                  sm: 'block',
                  md: 'block',
                },
              }}
            />
          </ListItem>
          <ListItem
            button
            sx={{ gap: '1rem' }}
            component={Link}
            to='/explore'
            onClick={() => handleItemClick('Messages')}
          >
            {location.pathname === '/home' ? (
              <MailRoundedIcon />
            ) : (
              <MailOutlineIcon />
            )}

            <ListItemText
              primary='Messages'
              primaryTypographyProps={{
                fontWeight: activeItem === 'Messages' ? 800 : 'normal',
                display: {
                  xs: 'none',
                  sm: 'block',
                  md: 'block',
                },
              }}
            />
          </ListItem>
          <ListItem
            button
            sx={{ gap: '1rem' }}
            component={Link}
            to='/favourites'
            onClick={() => handleItemClick('Favourites')}
          >
            {location.pathname === '/favourites' ? (
              <FavoriteRoundedIcon />
            ) : (
              <FavoriteBorderIcon />
            )}

            <ListItemText
              primary='Favourites'
              primaryTypographyProps={{
                fontWeight: activeItem === 'Favourites' ? 800 : 'normal',
                display: {
                  xs: 'none',
                  sm: 'block',
                  md: 'block',
                },
              }}
            />
          </ListItem>
          <ListItem
            button
            sx={{ gap: '1rem' }}
            component={Link}
            to='/explore'
            onClick={() => handleItemClick('Profile')}
          >
            {location.pathname === '/explore' ? (
              <PersonRoundedIcon />
            ) : (
              <PersonOutlineOutlinedIcon />
            )}
            <ListItemText
              primary='Profile'
              primaryTypographyProps={{
                fontWeight: activeItem === 'Profile' ? 800 : 'normal',
                display: {
                  xs: 'none',
                  sm: 'block',
                  md: 'block',
                },
              }}
            />
          </ListItem>
          <ListItem
            button
            sx={{ gap: '1rem' }}
            component={Link}
            to='/explore'
            onClick={() => handleItemClick('More')}
          >
            {location.pathname === '/explore' ? (
              <MoreHorizRoundedIcon />
            ) : (
              <MoreVertSharpIcon />
            )}
            <ListItemText
              primary='More'
              primaryTypographyProps={{
                fontWeight: activeItem === 'More' ? 800 : 'normal',
                display: {
                  xs: 'none',
                  sm: 'block',
                  md: 'block',
                },
              }}
            />
          </ListItem>
          <Button
            sx={{
              marginTop: '1rem',
              marginLeft: '1rem',
              paddingX: '50px',
              paddingY: '15px',
              fontWeight: 800,
              backgroundColor: '#1D9BF0',
              borderRadius: '25px',
              '@media (max-width: 1280px)': {
                width: '40%',
              },
              '@media (max-width: 860px)': {
                width: '50%',
              },
              '@media (max-width: 600px)': {
                width: '80%',
              },
            }}
            variant='contained'
          >
            Tweet
          </Button>
        </List>
      </Box>
    );
  }
}

export default TwitterHeader;
