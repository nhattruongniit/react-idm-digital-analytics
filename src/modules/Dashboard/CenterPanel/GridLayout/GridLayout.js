import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const DefaultPage = () => {
  const defaultProps = {
    className: "layout",
    rowHeight: 115,
    cols: 12,
    items: 12,
    isResizable: true,
    isDraggable: true
  }

  function generateLayout() {
    return [1,2,3,4,5].map((_, i) => {
      const y =  Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 3) % 12,
        y: Math.floor(i / 6) * y,
        w: 3,
        h: 4,
        i: i.toString()
      };
    })
  }

  return (
    <ReactGridLayout 
            {...defaultProps}
            layout={generateLayout()}
          >
            {[1,2,3,4,5].map((item, i) => {
              return (
                 <div key={item}>{item}</div>
              )
            })}
          </ReactGridLayout>
  )
}

export default DefaultPage;
