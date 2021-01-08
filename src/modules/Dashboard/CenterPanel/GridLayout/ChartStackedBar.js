import React from "react";
import { StackedBarChart } from "@carbon/charts-react";

const ChartStackedBar = ({ data, options}) => {
  return (
    <div className="chartCarbon">
      <StackedBarChart
        data={data}
        options={options} />
    </div>
  )
};

export default ChartStackedBar;
