import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";


const ReactGridLayout = WidthProvider(RGL);

const DefaultPage = () => {
  
  const defaultProps = {
    className: "layout",
    rowHeight: 115,
    cols: 12,
    isResizable: true,
    isDraggable: true
  }

  function generateLayout() {
    return [1,2,3,4,5].map((_, i) => {
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

  return (
    <ReactGridLayout 
      {...defaultProps}
      layout={generateLayout()}
    >
      {[1,2,3,4,5].map((item, i) => {
        return (
            <div key={`simulator-${i}`.toString()}>{item}</div>
        )
      })}
    </ReactGridLayout>
  )
}

export default DefaultPage;
