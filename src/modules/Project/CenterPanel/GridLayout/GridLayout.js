import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import RGL, { WidthProvider } from "react-grid-layout";
import styled, { css } from "styled-components";
import '@carbon/charts/styles.css';

// carbon core
import Close20 from "@carbon/icons-react/lib/close/20";
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';

// components
import ChartStackedBar from './ChartStackedBar';
import ChartDonut from './ChartDonut';
import ChartLine from './ChartLine';
import ChartStackedArea from './ChartStackedArea';

// selectors
import { addonSelector, boardDataSelector } from 'selectors/board.seclector';

// actions
import { removeAddon } from 'actions/board.action';

const ReactGridLayout = WidthProvider(RGL);

const DefaultPage = () => {
  const addons = useSelector(addonSelector);
  const boardData = useSelector(boardDataSelector);
  const dispatch = useDispatch();
  const [layouts, setLayouts] = useState([]);
  const [defaultLayouts, setDefaultLayouts] = useState([]);
  const [gridItem, setGridItem] = useState({
    isFullScreen: false,
    gridId: -1
  });

  const [defaultProps, setDefaultProps] = useState({
    className: "layout",
    rowHeight: 115,
    cols: 12,
    autoSize: true,
    isResizable: true,
    isDraggable: true
  })

  function generateLayout() {
    const newLayouts = addons.map((item, i) => {
      let w = 2;
      let h = 2;
      let x = 10;
      let y = Infinity;

      if (i === 0) {
        w = 4;
        h = 3;
        x = 0;
        y = 0;
      }

      if (i === 1) {
        w = 3;
        h = 3;
        x = 4;
        y = 0;
      }

      if (i === 2) {
        w = 5;
        x = 7;
        h = 3;
        y = 0;
      }

      if (i === 3) {
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
        static: defaultLayouts.length > 0 && defaultLayouts[i] && defaultLayouts[i].static,
        i: item.toString(),
      };
    })

    setLayouts(newLayouts);
    setDefaultLayouts(newLayouts);
  }

  useEffect(() => {
    generateLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addons])

  const _onRemoveItem = (layouts, item, idx) => () => {
    const newLayouts = layouts.filter((val) => val.i !== item);

    dispatch(removeAddon(idx))
    setLayouts(newLayouts);
  }

  const _onLayoutChange = (layout) => {
    setLayouts(layout)
  }

  const _handleFullScreen = itemI => () => {
    const newGridItem = {
      isFullScreen: !gridItem.isFullScreen,
      gridId: itemI
    }
    const newDefaultProps = {
      ...defaultProps,
      isDraggable: !newGridItem.isFullScreen 
    }

    setGridItem(newGridItem);
    setDefaultProps(newDefaultProps)
  }

  const _handleLock = (layouts, item) => () => {
    const newGrid = layouts.map((ele, i) => {
      if (ele.i === item) {
        return {
          ...layouts[i],
          static: !ele.static
        }
      }
      return layouts[i];
    })
    setLayouts(newGrid);
    setDefaultLayouts(newGrid)
  }

  const _handleMaximize = (layouts, item) => () => {
    const newGrid = layouts.map((ele, i) => {
      if (ele.i === item) {
        return {
          ...layouts[i],
          w: 12,
          h: 12
        }
      }
      return layouts[i];
    })
    setLayouts(newGrid)
  }

  const _handleMinimize = (layouts, item) => () => {
    const newGrid = layouts.map((ele, i) => {
      if (ele.i === item) {
        return {
          ...layouts[i],
          w: defaultLayouts[i].w,
          h: defaultLayouts[i].h
        }
      }
      return layouts[i];
    })
    setLayouts(newGrid)
  }

  return (
    <ReactGridLayout
      {...defaultProps}
      layout={layouts}
      onLayoutChange={_onLayoutChange}
    >
      {layouts.map((item, idx) => {
        const numberI = Number(item.i);
        const isFullScreen  = gridItem.isFullScreen && gridItem.gridId === numberI;

        return (
          <ItemStyled key={item.i.toString()} isFullScreen={isFullScreen}>
            <div className="contentStyled">
              {isFullScreen ? (
                <div className="chart_closeIcon" onClick={_handleFullScreen(numberI)}>
                  <Close20 />
                </div>
              ) : (
                <div className="chart_overmenu">
                  <OverflowMenu flipped>
                    <SizeStyled ismaximize={item.w === 12 && item.h === 12 ? 1 : 0} itemText="Maximize" onClick={_handleMaximize(layouts, item.i)} />
                    <SizeStyled ismaximize={item.w < 12 && item.h < 12 ? 1 : 0} itemText="Minimize" onClick={_handleMinimize(layouts, item.i)} />
                    <OverflowMenuItem itemText={`${item.static ? "Unlock" : "Lock"}`} onClick={_handleLock(layouts, item.i)} />
                    <OverflowMenuItem itemText="Full Screen" onClick={_handleFullScreen(numberI)} />
                    {numberI >= 5 ? <OverflowMenuItem itemText="Close" hasDivider onClick={_onRemoveItem(layouts, item.i, idx)} /> : null}
                  </OverflowMenu>
                </div>
              )}
              
              {boardData[numberI] && boardData[numberI].type === 'stackedBar' && <ChartStackedBar data={boardData[numberI].data} options={boardData[numberI].options} />}

              {boardData[numberI] && boardData[numberI].type === 'donut' && <ChartDonut data={boardData[numberI].data} options={boardData[numberI].options} />}

              {boardData[numberI] && boardData[numberI].type === 'line' && <ChartLine data={boardData[numberI].data} options={boardData[numberI].options} />}

              {boardData[numberI] && boardData[numberI].type === 'stackedArea' && <ChartStackedArea data={boardData[numberI].data} options={boardData[numberI].options} />}
            </div>
          </ItemStyled>
        )
      })}
    </ReactGridLayout>
  )
}

export default DefaultPage;

const SizeStyled = styled(OverflowMenuItem)`
  opacity: ${props => props.ismaximize ? 0.5 : 1};
  pointer-events: ${props => props.ismaximize ? 'none' : 'default'};
`

const ItemStyled = styled.div`
  .contentStyled {
    width: 100%;
    height: 100%;
  }

  ${props => props.isFullScreen && css`
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    transform: translate(-50%, -50%) !important;
    z-index: 9999;
    top: 50%;
    left: 50%;

    &::after {
      content: '';
      position: fixed;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 0;
      left:0;
      background-color: #000;
      opacity: 0.3;
    }
    .contentStyled {
      position: absolute;
      z-index: 3;
      width: 95%;
      height: 95%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `}
`
