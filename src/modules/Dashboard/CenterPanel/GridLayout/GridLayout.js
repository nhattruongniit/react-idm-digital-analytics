import React, { useState, useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";

const ReactGridLayout = WidthProvider(RGL);

const DefaultPage = () => {
  const items = [1,2,3,4,5];
  const [layouts, setLayouts] = useState([]);
  
  const defaultProps = {
    className: "layout",
    rowHeight: 115,
    cols: 12,
    isResizable: true,
    isDraggable: true
  }

  function generateLayout() {
    const newLayouts  = items.map((_, i) => {
      let w = 4;
      if(i === 0 || i === 1 || i === 2)  w = 6;
      const y =  Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 6) % 12,
        y: Math.floor(i / 6) * y,
        w,
        h: 4,
        i: `simulator-${i}`.toString()
      };
    })

    setLayouts(newLayouts);
  }

  useEffect(() => {
    generateLayout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeStyle = {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer"
  };

  const onRemoveItem = item => () => {
    const newLayouts = layouts.filter((val) => val.i !== item)
    setLayouts(newLayouts)
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
      {layouts.map((item) => {
        return (
          <div key={item.i.toString()}>
            {item.i}
            <span
              className="remove"
              style={removeStyle}
              onClick={onRemoveItem(item.i)}
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
