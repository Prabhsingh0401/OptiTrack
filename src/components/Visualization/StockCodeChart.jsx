import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './index.scss';

const StockCodeChart = ({ data }) => (
    <BarChart
        className='BarChart'
        width={600}  // Width of the chart
        height={400}  // Height of the chart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, bottom: 20, left: 40 }}  // Adjust margins if needed
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
            type="number"
            domain={[0, 'dataMax']}
            allowDecimals={false}  // Use integers only for ticks
        />
        <YAxis
            type="category"
            dataKey="stockCode"  // Use 'stockCode' for Y-axis
            width={300}  // Adjust the width to accommodate longer text
            stroke="#ffffff"  // Make the Y-axis text more white
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#82ca9d" />
    </BarChart>
);

export default StockCodeChart;
