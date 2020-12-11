import React, { memo } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend
} from 'recharts';

const DefaultPage = memo(({ hasMaximize, widthPanel, chartData, labels }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius={hasMaximize ? 280 : (widthPanel / 120) * 45} data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        {Object.keys(labels).map(label => (
          <Radar name={label} dataKey={label} stroke={labels[label]} fill={labels[label]} fillOpacity={0.6} />
        ))}
        <Tooltip />
        {hasMaximize && <Legend/>}
      </RadarChart>
    </ResponsiveContainer>
  );
});

export default DefaultPage;