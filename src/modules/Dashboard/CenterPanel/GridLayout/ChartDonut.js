import React from "react";
import { DonutChart } from "@carbon/charts-react";

const ChartDonut = ({ data, options}) => {
  return (
    <div className="chartCarbon chartDonut">
      <DonutChart
        data={data}
        options={options} />
    </div>
  )
};

export default ChartDonut;
