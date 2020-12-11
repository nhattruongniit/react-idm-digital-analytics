import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class DefaultPage extends PureComponent {
  render() {
    const { hasMaximize, widthPanel, chartData, plottedType, labels } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
         <PieChart>
          {plottedType === 'single' && (
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={hasMaximize ? 300 : (widthPanel / 150) * 65}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((value, index) => (
                <Cell key={`cell-${index}`} fill={labels[value.name]} />
              ))}
            </Pie>
          )}
          {plottedType === 'group' && (
            <Pie
              data={chartData.outerData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              // outerRadius={hasMaximize ? 320 : (widthPanel / 150) * 65}
              fill="#8884d8"
              dataKey="value"
              outerRadius={65}
            >
              {chartData.outerData.map((value, index) => (
                <Cell key={`cell-inner-${index}`} fill={labels[value.name]} />
              ))}
            </Pie>
          )}

          {plottedType === 'group' && (
            <Pie
              data={chartData.innerData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={hasMaximize ? 270 : (widthPanel / 170) * 65}
              fill="#8884d8"
              dataKey="value"
              innerRadius={80} 
              // label
            >
              {chartData.innerData.map((value, index) => (
                <Cell key={`cell-inner-${index}`} fill={labels[value.name]} />
              ))}
            </Pie>
          )}
          {hasMaximize && <Legend />}
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    );
  }
};