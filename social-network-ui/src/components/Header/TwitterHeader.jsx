import React, { useState, useEffect } from 'react'
import getApiPosts from '../../api/getApiPosts'
import UseUserToken from '../../hooks/useUserToken'
import { Link, useLocation } from 'react-router-dom'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import TwitterIcon from '@mui/icons-material/Twitter'
import HomeIcon from '@mui/icons-material/Home'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded'
import SearchIcon from '@mui/icons-material/Search'
import MailRoundedIcon from '@mui/icons-material/MailRounded'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import styles from '../HomePage/Post/Post.module.scss'
import PropTypes from 'prop-types'
function TwitterHeader() {
	const location = useLocation()
	const [activeItem, setActiveItem] = useState(null)

	const handleItemClick = itemName => {
		setActiveItem(itemName)
	}
	return (
		<Box
			sx={{
				gap: '1.5rem',
				width: '100%',
				paddingX: '1.5rem',
				//   marginLeft: "1.5rem",
				height: '100%',
				bgcolor: 'white',
			}}
		>
			<List>
				<ListItem button sx={{ gap: '1rem' }} component={Link} to='/profile/50'>
					<TwitterIcon
						sx={{
							color: '#1DA1F2',
							fontSize: '50px',
						}}
					/>
					<ListItemText />
				</ListItem>

				<ListItem
					button
					sx={{ gap: '1rem' }}
					component={Link}
					to='/home'
					onClick={() => handleItemClick('Home')}
				>
					{location.pathname === '/home' ? <HomeIcon /> : <HomeOutlinedIcon />}
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
					}}
					variant='contained'
				>
					Tweet
				</Button>

				{/* <ListItem>
          <div className={styles.post}>
            {tweet.user.avatar ? (
              <Avatar
                alt={`${tweet.user.firstName} ${tweet.user.lastName}`}
                src={tweet.user.avatar}
                sx={{ width: 50, height: 50, mr: 2, alignSelf: "flex-start" }}
              />
            ) : (
              <Avatar
                sx={{ width: 50, height: 50, mr: 2, alignSelf: "flex-start" }}
              >
                {tweet.user.firstName.charAt(0)}
                {tweet.user.lastName.charAt(0)}
              </Avatar>
            )}
            <div className={styles.post__body}>
              <div className={styles.body__header}>
                <span className={styles.header__mainName}>
                  {`${tweet.user.firstName} ${tweet.user.lastName}`}
                </span>
                <span className={styles.header__tagName}>
                  {tweet.user.username}
                </span>

                <span className={styles.header__time}>{tweet.createdDate}</span>
              </div>
              <div className={styles.body__main}>
                <p className={styles.main__twitte}>{tweet.description}</p>
                {tweet.photo && (
                  <img
                    className={styles.main__photo}
                    src={tweet.photo}
                    alt=""
                    width={350}
                    height={250}
                  />
                )}
              </div>
            </div>
          </div>
        </ListItem> */}
			</List>
		</Box>
	)
}

export default TwitterHeader