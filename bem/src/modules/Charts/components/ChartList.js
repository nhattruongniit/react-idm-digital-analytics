import React from 'react';
import styled, { css } from 'styled-components';
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const ItemWrapper = styled.div`
  width: ${({ itemWidth }) => itemWidth}% !important;
  box-sizing: border-box;
  position: relative;
  ${props => props.hasMaximize && css`
    top: 53%;
    left: 60%;
    position: fixed !important;
    width: 90% !important;
    height: 85% !important;
    transform: translate(-60%, -50%) !important;
    z-index: 3;
    background-color: #fff;
    .overlay {
      display: none !important;
    }
  `}
`;

const GridStyled = styled.div`
  .react-grid-item.cssTransforms {
    margin: 0;
  }
`

const ContainerStyled = styled.div`
  ${props => props.hasMaximize && css`
    &::after {
      content: '';
      position: fixed;
      z-index: 2;
      width: 100%;
      height: 100%;
      top: 0;
      left:0;
      background-color: #000;
      opacity: 0.3;
    }
  `}
`

const ChartList = ({
  items,
  selectedIds,
  listtemComponent,
  itemWidth,
  isMaximize,
  chartId,
  ...props
}) => {
  const ListItem = listtemComponent;
  const isItemSelected = projectId => selectedIds && selectedIds.indexOf(projectId) !== -1;

  const defaultProps = {
    className: "layout",
    rowHeight: 115,
    cols: 12,
    items: 12,
    isResizable: false,
    isDraggable: !isMaximize
  }

  function generateLayout() {
    return items.map((_, i) => {
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
    <ContainerStyled hasMaximize={isMaximize}>
      {items.length > 0 && (
        <GridStyled>
          <ReactGridLayout 
            {...defaultProps}
            layout={generateLayout()}
          >
            {items.map((item, i) => {
              const hasMaximize = isMaximize && item.id === chartId;
              return (
                  <ItemWrapper key={i} itemWidth={itemWidth} hasMaximize={hasMaximize} >
                    <ListItem
                      item={item}
                      isSelected={isItemSelected(item.id)}
                      isMaximize={isMaximize}
                      chartId={chartId}
                      {...props}
                    />
                  </ItemWrapper>
              )
            })}
          </ReactGridLayout>
        </GridStyled>
      )}
    </ContainerStyled>
  );
}

export default ChartList;
