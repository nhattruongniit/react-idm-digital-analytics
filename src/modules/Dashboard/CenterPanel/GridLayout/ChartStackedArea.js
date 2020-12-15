import React from "react";
import { StackedAreaChart } from "@carbon/charts-react";

const ChartStackedBar = ({ data, options}) => {
  return (
    <div className="chartCarbon">
      <StackedAreaChart
        data={data}
        options={options} />
    </div>
  )
};

export default ChartStackedBar;
