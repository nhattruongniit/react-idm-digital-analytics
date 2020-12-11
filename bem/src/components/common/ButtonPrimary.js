import React from 'react';

import { Button } from 'carbon-components-react';

const ButtonPrimary = ({ title, onClick, size = "small", icon }) => {
  return (
    <Button kind="primary" size={size} onClick={onClick}>
      {title || 'Create new'} &nbsp; 
      {icon}
    </Button>
  )
}

export default ButtonPrimary;