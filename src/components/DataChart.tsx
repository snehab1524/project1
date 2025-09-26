'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from 'recharts';

interface DataChartProps {
  data: any[];
  dataKey: string;
  unit: string;
  strokeColor: string;
  domain?: [number, number];
}

export const DataChart: React.FC<DataChartProps> = ({ data, dataKey, unit, strokeColor, domain }) => {
  const formatDate = (tickItem: string) => {
    return new Date(tickItem).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="date" 
          stroke="#9CA3AF"
          tickFormatter={formatDate} 
        />
        <YAxis 
          stroke="#9CA3AF" 
          domain={domain}
          label={{ value: unit, angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            borderColor: '#374151',
            color: '#F9FAFB',
          }}
          labelFormatter={formatDate}
        />
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={strokeColor} 
          strokeWidth={2} 
          dot={false}
        />
        <Brush 
          dataKey="date" 
          height={30} 
          stroke="#60A5FA" 
          fill="#1F2937"
          tickFormatter={formatDate}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};