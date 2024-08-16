import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './index.scss'

const MyChart = ({ data }) => (
    <BarChart
        className='BarChart'
        width={600}  // Width of the chart
        height={400}  // Height of the chart
        data={data}
        layout="vertical"
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
            type="number"
            domain={[0, 'dataMax']}
            allowDecimals={false}  // Use integers only for ticks
        />
        <YAxis
            type="category"
            dataKey="description"  // Use 'description' for Y-axis
            width={300}  // Adjust the width to accommodate longer text
            stroke="#ffffff"  // Make the Y-axis text more white
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
    </BarChart>
);

export default MyChart;
