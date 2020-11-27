import React, { useState } from 'react';


// assets
import PythonIcon from 'assets/images/python.png';
import EnergyIcon from 'assets/images/energy.png';
import JupyterIcon from 'assets/images/jupyter.png';
import CfdIcon from 'assets/images/cfd.png';

// carbon icon
import Close20 from "@carbon/icons-react/lib/close/20";
import Add20 from "@carbon/icons-react/lib/add/20";


function AddOn() {
  const [isShow, setIsShow] = useState(true);

  const _handleToggleAddon = () => {
    setIsShow(!isShow)
  }
  
  return (
    <div className="addon_root">
      {isShow ? (
        <div className="addon_list">
          <div className="addon_item active">
            <img src={PythonIcon} title="Add On" alt="Add On" />
            <span>Python</span>
          </div>
          <div className="addon_item">
            <img src={EnergyIcon} title="Add On" alt="Add On" />
            <span>Energy+</span>
          </div>
          <div className="addon_item">
            <img src={JupyterIcon} title="Add On" alt="Add On" />
            <span>Jupyter</span>
          </div>
          <div className="addon_item">
            <img src={CfdIcon} title="Add On" alt="Add On" />
            <span>CDF</span>
          </div>
        </div>
      ) : null}
      
      <div className="addon_svg" onClick={_handleToggleAddon}> 
        {isShow ? <Close20 /> : <Add20 />}
      </div>
    </div>
  )
}

export default AddOn;
