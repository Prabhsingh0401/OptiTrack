// src/components/MyChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MyChart = ({ data }) => (
    <BarChart width={800} height={500} data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
            type="number"
            domain={[0, 'dataMax']}
            ticks={[0, 5, 10, 15, 20, 25, 30, 35]}  // Adjust the ticks based on the Quantity range in your data
            allowDecimals={false}  // Use integers only for ticks
        />
        <YAxis
            type="category"
            dataKey="description"  // Use 'description' for Y-axis
            width={300}  // Adjust the width to accommodate longer text
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
    </BarChart>
);

export default MyChart;


