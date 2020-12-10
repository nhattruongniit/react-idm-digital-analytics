import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import RGL, { WidthProvider } from "react-grid-layout";
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import styled from "styled-components";
import '@carbon/charts/styles.css';

// components
import ChartStackedBar from './ChartStackedBar';
import ChartDonut from './ChartDonut';
import ChartLine from './ChartLine';

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
        return (
          <div key={item.i.toString()}>
            <div className="chart_overmenu">
              <OverflowMenu flipped>
                <SizeStyled ismaximize={item.w === 12 && item.h === 12 ? 1 : 0} itemText="Maximize" onClick={_handleMaximize(layouts, item.i)} />
                <SizeStyled ismaximize={item.w < 12 && item.h < 12 ? 1 : 0} itemText="Minimize" onClick={_handleMinimize(layouts, item.i)} />
                <OverflowMenuItem itemText={`${item.static ? "Unlock" : "Lock"}`} onClick={_handleLock(layouts, item.i)} />
                <OverflowMenuItem itemText="Full Screen" />
                {Number(item.i) >= 5 ? <OverflowMenuItem itemText="Close" hasDivider onClick={_onRemoveItem(layouts, item.i, idx)} /> : null}
              </OverflowMenu>
            </div>

            {boardData[Number(item.i)] && boardData[Number(item.i)].type === 'stackedBar' && <ChartStackedBar data={boardData[Number(item.i)].data} options={boardData[Number(item.i)].options} />}

            {boardData[Number(item.i)] && boardData[Number(item.i)].type === 'donut' && <ChartDonut data={boardData[Number(item.i)].data} options={boardData[Number(item.i)].options} />}

            {boardData[Number(item.i)] && boardData[Number(item.i)].type === 'line' && <ChartLine data={boardData[Number(item.i)].data} options={boardData[Number(item.i)].options} />}

          </div>
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
