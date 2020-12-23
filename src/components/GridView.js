import React from 'react';

function GridView({ data, gridItem: GridItem }) {
  return (
    <div className="dashboardGrid_root">
      {data.map(item => {
        return (
          <GridItem 
            key={item.id}
            item={item}
          />
        )
      })}
    </div>
  )
}

export default GridView
