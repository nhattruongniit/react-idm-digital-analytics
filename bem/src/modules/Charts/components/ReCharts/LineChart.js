import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default class LineChartPage extends PureComponent {
  render() {
		const { chartData, labels, hasMaximize } = this.props;
		
    return (
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					width={500}
					height={300}
					data={chartData || []}
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
						<Line
							type="monotone"
							dataKey={label}
							stroke={labels[label]}
							activeDot={{ r: 8 }}
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
    );
  }
}
