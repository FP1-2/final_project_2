import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import LogoutIcon from '@mui/icons-material/Logout'
import styles from './index.module.scss'

import PropTypes from 'prop-types'

const drawerWidth = 240

export default function PermanentDrawerLeft ({ pageName }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {pageName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            'home',
            'explore',
            'notifications',
            'messages',
            'bookmarks',
            'profile'
          ].map((text, index) => (
            <NavLink to={'/' + text} key={text} className={styles.navlink}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <SearchIcon />}
                    {index === 2 && <NotificationsNoneIcon />}
                    {index === 3 && <MailOutlineIcon />}
                    {index === 4 && <BookmarkBorderIcon />}
                    {index === 5 && <PermIdentityIcon />}
                  </ListItemIcon>
                  {text}
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
        <Button
          sx={{
            justifyContent: 'left',
            mt: '5px',
            width: '100%',
            pl: '16px',
            color: 'rgb(108, 101, 101)',
            textTransform: 'none',
            fontWeight: '700',
            fontSize: '1rem'
          }}
        >
          <div className={styles.logoutIcon}>
            <LogoutIcon />
          </div>
          Logout
        </Button>
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  )
}

PermanentDrawerLeft.propTypes = {
  pageName: PropTypes.string
}
