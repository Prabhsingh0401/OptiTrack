import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const calculateTurnoverRate = (quantitySold, restockDate) => {
    const currentDate = new Date();
    const restockDateParsed = new Date(restockDate);
    const daysSinceRestock = (currentDate - restockDateParsed) / (1000 * 60 * 60 * 24);
    return daysSinceRestock > 0 ? quantitySold / daysSinceRestock : 0;
};

const StockTurnoverChart = ({ data }) => {
    const turnoverData = data.map(item => ({
        description: item.description,
        turnoverRate: calculateTurnoverRate(item.quantity, item.restockDate),
    }));

    return (
        <ScatterChart
            width={600}
            height={400}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
            <CartesianGrid />
            <XAxis
                type="number"
                dataKey="turnoverRate"
                name="Turnover Rate"
                unit=" units/day"
                allowDecimals={false}
            />
            <YAxis
                type="category"
                dataKey="description"
                name="Product"
                width={300}
                stroke="#ffffff"
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Products" data={turnoverData} fill="#82ca9d" />
        </ScatterChart>
    );
};

export default StockTurnoverChart;
