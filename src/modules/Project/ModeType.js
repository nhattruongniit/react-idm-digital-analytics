import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// carbon icons
import GridIcon from '@carbon/icons-react/es/grid/20';
import ListIcon from '@carbon/icons-react/es/list/20';

// redux
import { layoutTypeSelector } from 'selectors/app.selector';
import { setLayoutType } from 'actions/app.action';

function ModeType() {
  const dispatch = useDispatch();
  const layoutType = useSelector(layoutTypeSelector);

  const _onChangeType = type => () => {
    dispatch(setLayoutType(type))
  }
  
  return (
    <div className="dashboard_mode">
      <span className={layoutType === 'grid' ? "active" : ''} onClick={_onChangeType('grid')}>
        <GridIcon />
      </span>
      <span className={layoutType === 'list' ? "active" : ''} onClick={_onChangeType('list')}>
        <ListIcon /> 
      </span>
    </div>
  )
}

export default ModeType;
