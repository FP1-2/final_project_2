import React from 'react';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/material';

const ProfilePageSkeleton = () => {
  return (
    <Box>
      <Box
        sx={{
          height: '560px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '45%',
            bgcolor: 'rgb(29, 161, 241)',
          }}
        >
          <Skeleton
            variant='text'
            width={250}
            sx={{
              paddingX: '1rem',
              wordSpacing: '0.5rem',
              letterSpacing: '0.4rem',
              color: 'white',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          ></Skeleton>
        </Box>
        <Box
          sx={{
            height: '55%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              paddingX: '1rem',
              marginBottom: '1rem',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: '1rem',
                top: '0',
                transform: 'translateY(-50%)',
              }}
            >
              <Skeleton
                variant='circular'
                width='8rem'
                height='8rem'
                sx={{
                  mb: 1,
                  border: '3px solid white',
                  bgcolor: 'rgb(29, 161, 241)',
                }}
              ></Skeleton>
            </Box>
            <Skeleton
              variant='rectangular'
              width={120}
              sx={{
                marginTop: '1rem',
                p: 1,
                paddingX: '1.1rem',
                borderRadius: '3rem',
                textTransform: 'none',
                color: 'black',
              }}
            ></Skeleton>
          </Box>
          <Skeleton
            variant='text'
            width='100px'
            sx={{
              marginX: '1rem',
              marginY: 5.5,
              fontSize: '1.3rem',
              color: 'black',
            }}
          ></Skeleton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
              width: '100%',
              marginBottom: 2.5,
              color: 'black',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '30px',
            }}
          >
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <Skeleton variant='text' width={50} />
              <Skeleton variant='text' width={70} />
            </Box>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <Skeleton variant='text' width={50} />
              <Skeleton variant='text' width={70} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ paddingX: '1rem', borderBottom: '1px solid #C4C4C4' }}></Box>
    </Box>
  );
};

export default ProfilePageSkeleton;
