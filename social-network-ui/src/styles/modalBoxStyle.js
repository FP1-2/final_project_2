export const modalBoxstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflowY: 'auto',
  maxHeight: '100vh',
  maxHeight: '100lvh',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: '7px',
  p: 2,
  '@media (min-width: 1800px)': {
    width: '40%'
  },
  '@media (min-width: 1380px)': {
    width: '55%'
  },
  '@media (min-width: 1280px)': {
    width: '60%'
  },
  '@media (max-width: 1279px)': {
    width: '70%'
  },
  '@media (max-width: 960px)': {
    width: '80%'
  },
  '@media (max-width: 780px)': {
    width: '90%'
  },
  '@media (max-width: 600px)': {
    width: '100%',
    minHeight: '100vh'
  }
}
