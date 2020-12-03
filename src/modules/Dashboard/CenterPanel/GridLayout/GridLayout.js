import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import RGL, { WidthProvider } from "react-grid-layout";

// selectors
import { addonSelector } from 'selectors/board.seclector';

// actions
import { removeAddon } from 'actions/board.action';

const ReactGridLayout = WidthProvider(RGL);

const DefaultPage = () => {
  const addons = useSelector(addonSelector);
  const dispatch = useDispatch();
  const [layouts, setLayouts] = useState([]);
  
  const defaultProps = {
    className: "layout",
    rowHeight: 115,
    cols: 12,
    isResizable: true,
    isDraggable: true
  }

  function generateLayout() {
    const newLayouts = addons.map((item, i) => {
      let w = 2;
      let h = 2;
      let x = 10;
      let y = Infinity;
      
      if(i === 0) {
        w = 4;
        h = 3;
        x = 0;
        y = 0;
      }

      if(i === 1) {
        w = 3;
        h = 3;
        x = 4;
        y = 0;
      }

      if(i === 2) {
        w = 5;
        x = 7;
        h = 3;
        y = 0;
      }

      if(i === 3) {
        w = 10;
        x = 0;
        h = 5;
        y = 3;
      }

      if (i >= 6) {
        x = (i - 6) * 2 % defaultProps.cols;
        w = 2;
      }

      return {
        x,
        y,
        w,
        h,
        i: `simulator-${item}`.toString()
      };
    })

    setLayouts(newLayouts);
  }

  useEffect(() => {
    generateLayout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addons])

  const removeStyle = {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer"
  };

  const onRemoveItem = (item, idx) => () => {
    const newLayouts = layouts.filter((val) => val.i !== item)
    setLayouts(newLayouts);
    dispatch(removeAddon(idx))
  }

  const _onLayoutChange = (layout) => {
    setLayouts(layout)
  }

  return (
    <ReactGridLayout 
      {...defaultProps}
      layout={layouts}
      onLayoutChange={_onLayoutChange}
    >
      {layouts.map((item, idx) => {
        return (
          <div key={item.i.toString()}>
            {item.i}
            <span
              className="remove"
              style={removeStyle}
              onClick={onRemoveItem(item.i, idx)}
            >
              x
            </span>
          </div>
        )
      })}
    </ReactGridLayout>
  )
}

export default DefaultPage;
