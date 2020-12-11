import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default class DefaultPage extends PureComponent {
  render() {
    const { chartData, labels, hasMaximize } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {hasMaximize && <Legend />}
          {Object.keys(labels).map(label => (
            <Bar dataKey={label} fill={labels[label]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}