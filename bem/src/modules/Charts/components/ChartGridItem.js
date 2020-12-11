import React, { createRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import MinimizeIcon from '@carbon/icons-react/es/minimize/16';


import SkeletonPlaceholder from 'carbon-components-react/lib/components/SkeletonPlaceholder';
import Overlay from './Overlay';
import EditableName from 'components/common/DashboardGrid/EditableName';

import BarChart from './ReCharts/BarChart';
import PieChart from './ReCharts/PieChart';
import RadarChar from './ReCharts/RadarChart';
import LineChart from './ReCharts/LineChart';
import LineCanvasChart from './ReCharts/LineCanvasChart';

import dataLineCanvasChart from './ReCharts/mocks/dataLineCanvasChart';
import dataLineReChart from './ReCharts/mocks/dataLineChart';

import Circle from 'components/common/Circle';

const ChartDetailsContainer = styled.div`
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
  padding: ${props => props.isLineChart ? '35px 10px 35px 10px;' : '10px'};
  height: 460px;
  background-color: #fff;
  font-size: 12px;
  position: relative;
  .overlay {
    display: none;
    background-color: #f00;
  }
  .overlay.block {
    display: block;
  }
  .overlay.hidden {
    display: none
  }
  :hover {
    .overlay {
      display: block;
    }
  }
`;

const NameContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;
  margin-bottom: 10px;
  display: ${props => props.hasMaximize ? 'none' : 'block'}
`;


const ButtonWrapper = styled.div`
  cursor: pointer;
  fill: #5596E6;
  position: absolute;
  right: 15px;
  z-index: 3;
  top: 10px;
`;

const StyledChart = styled.div`
  height: 100%;
  ${props => props.hasMaximize && css`
    position: fixed;
    top: 53%;
    left: 60%;
    width: 100%;
    height: 100%;
    z-index: 3;
    transform: translate(-60%, -52%);
    background-color: #fff;
    padding: 30px 0;
    .overlay {
      display: none !important;
    }
  `}
  .canvasjs-chart-canvas {
    height: 400px !important;
  }
`

const StyledCanvasJS = styled.div` 
  .canvasjs-chart-credit {
    display: none;
  }
  ${props => props.hasMaximize && css`
    padding: 0 10px;
    .canvasjs-chart-canvas {
      height: 70vh !important;
    }
  `}
`

const ChartGridItem = ({
  item,
  isSelected,
  selectItem,
  size,
  setItemName,
  isMaximize,
  setMaximizeChartFn,
  chartId,
  amountLineChart,
  changeRenderLineChartFn,
  circles,
  ...props
}) => {
  const [widthPanel, setWidthPanel] = useState(0);
  const editableNameRef = React.useRef();
  const hasMaximize = isMaximize && item.id === chartId;
  const dataLineChart = amountLineChart >= 5000 ? dataLineCanvasChart : dataLineReChart;
  const refPanel = createRef();
  const chartJson = item.chart_data && JSON.parse(item.chart_data);
  const chartData = chartJson && chartJson.chartValues.chartValues[0].chartData;
  // const activePage = chartJson && chartJson.chartValues.activePage;
  const labels = chartJson && chartJson.chartValues.labels;
  // const activeTabId = chartJson && chartJson.tabs.activeTabId;
  // const tabById = chartJson && chartJson.tabs.tabById;
  // const chartOptions = activeTabId && tabById[activeTabId] && tabById[activeTabId].options;
  const plottedType = chartJson && chartJson.plottedVariables.plottedType;
  const [isSkeleton, setIsSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsSkeleton(false), process.env.REACT_APP_TIME_LOADING_SKELETON || 700)

    if (refPanel.current.clientWidth > refPanel.current.clientHeight) {
      setWidthPanel(refPanel.current.clientHeight);
    } else {
      setWidthPanel(refPanel.current.clientWidth);
    }

  }, [])

  function onRequestRename() {
    editableNameRef.current.editName();
  }

  const renderLineChart = () => {
    if (item.type === 'line') {
      return (
        <>
          {amountLineChart >= 5000 ? (
            <>
              <StyledCanvasJS hasMaximize={hasMaximize} >
                <LineCanvasChart dataLineChart={dataLineChart} hasMaximize={hasMaximize} chartData={chartData} labels={labels} />
              </StyledCanvasJS>
            </>
          ) :
            (
              <LineChart hasMaximize={hasMaximize} chartData={chartData} labels={labels} />
            )}
        </>
      )
    }
  }

  const changeCanvasJS = () => {
    changeRenderLineChartFn(5000)
  }

  const changeReChart = () => {
    changeRenderLineChartFn(4999)
  }

  return (
    <div ref={refPanel}>
      {isSkeleton ? (
         <SkeletonPlaceholder />
      ) : (
        <>
          <NameContainer hasMaximize={hasMaximize}>
            <EditableName
              name={item.chart_name}
              onNameChange={name => setItemName(item.id, name, item.parent_simulation_id, item.type, item.options)}
              ref={editableNameRef}
            />
          </NameContainer>
          <ChartDetailsContainer isLineChart={item.type === 'line'}>
            {circles[item.id] && <Circle position="absolute" top={10} left={10} right={0} bottom={0} />}
            <StyledChart hasMaximize={hasMaximize} >
              <div className={`overlay ${isSelected ? 'block' : 'hidden'}`}>
                <Overlay
                  id={item.id}
                  isSelected={isSelected}
                  onToggleSelected={selectItem}
                  onRequestRename={onRequestRename}
                  setMaximizeChartFn={setMaximizeChartFn}
                  changeCanvasJS={changeCanvasJS}
                  changeReChart={changeReChart}
                  isLineChart={item.type === 'line'}
                  amountLineChart={amountLineChart}
                  {...props}
                />
              </div>
              {hasMaximize && (
                <ButtonWrapper onClick={() => setMaximizeChartFn(item.id, false)}>
                  <MinimizeIcon width={20} height={20} />
                </ButtonWrapper>
              )}

              {item.type === 'bar' && <BarChart chartData={chartData} labels={labels} hasMaximize={hasMaximize} />}
              {item.type === 'pie' && <PieChart hasMaximize={hasMaximize} widthPanel={widthPanel} chartData={chartData} labels={labels} plottedType={plottedType} />}
              {item.type === 'radar' && <RadarChar hasMaximize={hasMaximize} widthPanel={widthPanel} chartData={chartData} labels={labels} />}
              {renderLineChart()}
            </StyledChart>
          </ChartDetailsContainer>
        </>
      )}
    </div>
  )
}

export default ChartGridItem;
