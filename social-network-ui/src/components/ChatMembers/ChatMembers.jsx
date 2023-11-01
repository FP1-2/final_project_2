import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box } from '@mui/material'


function ChatMembers({chatmembers}) {
  return (
    <Box sx={{
      display:'flex',
    }}>
      <Box>
      {chatmembers.avatar && (
										<Avatar
											sx={{
												width: '3rem',
												height: '3rem',
												mb: 1,
											}}
											src={chatmembers.avatar}
										></Avatar>
									) }
      </Box>
     
      <Box>
        {chatmembers.firstName}
      </Box>
        
        <Box>
          {chatmembers.username}
        </Box>
    </Box>
  )
}
ChatMembers.propTypes = {
	chatmembers: PropTypes.object,
	
}
export default ChatMembers