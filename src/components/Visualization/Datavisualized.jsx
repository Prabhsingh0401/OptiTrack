import React, { useEffect, useState } from 'react';
import MyChart from './Chart';
const Datavisualize = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch the JSON file
        fetch('../../assets/csvjson.json')  // Change the path based on where your JSON file is stored
            .then(response => response.json())  // Parse the JSON directly
            .then(jsonData => {
                console.log('Fetched JSON Data:', jsonData);

                // Filter out any invalid rows that might not have Description or Quantity
                const formattedData = jsonData
                    .filter(item => item.Description && item.Quantity)  // Ensure valid rows
                    .map(item => ({
                        description: item.Description,  // Map 'Description' to Y-axis
                        quantity: item.Quantity         // Use 'Quantity' for X-axis (no need to parse to integer)
                    }));
                
                console.log('Formatted Data:', formattedData);  // Log the formatted data
                setData(formattedData);
            })
            .catch(err => console.error('Error fetching JSON file:', err));  // Error handling for fetch
    }, []);  // Empty dependency array means this runs once when the component mounts

    return (
        <div>
            {data.length > 0 ? <MyChart data={data} /> : <p>Loading chart...</p>}
        </div>
    );
};

export default Datavisualize;
