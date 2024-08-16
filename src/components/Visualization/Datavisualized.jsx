import React, { useEffect, useState } from 'react';
import MyChart from './QuantityDescChart';
import StockCodeChart from './StockCodeChart';
import './index.scss';
import Graph from '../../assets/Graph icon.png'

const Datavisualize = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch the JSON file
        fetch('/public/csvjson.json')  // Ensure this path is correct
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();  // Parse the JSON directly
            })
            .then(jsonData => {
                console.log('Fetched JSON Data:', jsonData);

                // Filter and format data
                const formattedData = jsonData
                    .filter(item => item.Description && !isNaN(item.Quantity) && item.StockCode)
                    .map(item => ({
                        description: item.Description,  // Map 'Description' to Y-axis for QuantityChart
                        quantity: Number(item.Quantity), // Ensure Quantity is a number
                        stockCode: item.StockCode  // Add StockCode for the second chart
                    }));
                
                console.log('Formatted Data:', formattedData);  // Log the formatted data
                setData(formattedData);
            })
            .catch(err => console.error('Error fetching JSON file:', err));  // Error handling for fetch
    }, []);  // Empty dependency array means this runs once when the component mounts

    return (
        <div className='data-visualisation'>
        <h1>Graphs<img src={Graph}></img></h1>
        <div className='main-div' style={{ display: 'flex'}}>
            {data.length > 0 ? (
                <>
                    <div style={{ marginRight: '20px' }}>
                        <h3 className='chart'>Quantity Chart</h3>
                        <MyChart data={data} />
                    </div>
                    <div>
                        <h3 className='chart'>Stock Code Chart</h3>
                        <StockCodeChart data={data} />
                    </div>
                </>
            ) : (
                <p>Loading charts...</p>
            )}
        </div>
        </div>
    );
};

export default Datavisualize;
