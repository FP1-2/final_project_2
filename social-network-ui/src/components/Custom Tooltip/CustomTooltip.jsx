import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { PropTypes } from 'prop-types'

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function CustomTooltip({ children, title }) {
  return (
      <LightTooltip title={title}>
          {children}
      </LightTooltip>
  );
}

CustomTooltip.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
}
