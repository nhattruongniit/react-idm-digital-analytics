import React, { useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";

const ReactGridLayout = WidthProvider(RGL);

const DefaultPage = () => {
  const [items, setItems] = useState([1,2,3,4,5])
  
  const defaultProps = {
    className: "layout",
    rowHeight: 115,
    cols: 12,
    isResizable: true,
    isDraggable: true
  }

  function generateLayout() {
    return items.map((_, i) => {
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
  }

  console.log(generateLayout())
  const removeStyle = {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer"
  };

  const onRemoveItem = index => () => {
    const newItems = items.filter((_, idx) => index !== idx)
    setItems(newItems)
  }

  return (
    <ReactGridLayout 
      {...defaultProps}
      layout={generateLayout()}
    >
      {items.map((item, i) => {
        return (
          <div key={`simulator-${i}`.toString()}>
            {item}
            <span
              className="remove"
              style={removeStyle}
              onClick={onRemoveItem(i)}
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
