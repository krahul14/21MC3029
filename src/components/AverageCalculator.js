// src/components/AverageCalculator.js
import React, { useState } from 'react';
import ApiService from '../services/ApiService';

const AverageCalculator = () => {
    const [numberId, setNumberId] = useState('');
    const [windowPrevState, setWindowPrevState] = useState([]);
    const [windowCurrState, setWindowCurrState] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [avg, setAvg] = useState(0);

    const handleInputChange = (e) => {
        setNumberId(e.target.value);
    };

    const handleFetchNumbers = () => {
        ApiService.fetchNumbers(numberId)
            .then(data => {
                if (data) {
                    const newNumbers = data.numbers;
                    const newWindowCurrState = [...windowCurrState, ...newNumbers].slice(-10);

                    setWindowPrevState(windowCurrState);
                    setWindowCurrState(newWindowCurrState);
                    setNumbers(newNumbers);

                    const newAvg = newWindowCurrState.reduce((sum, num) => sum + num, 0) / newWindowCurrState.length;
                    setAvg(newAvg.toFixed(2));
                }
            });
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <input type="text" value={numberId} onChange={handleInputChange} placeholder="Enter ID (p, f, e, r)" />
            <button onClick={handleFetchNumbers}>Fetch Numbers</button>
            <div>
                <h2>Results</h2>
                <p>Previous Window State: {JSON.stringify(windowPrevState)}</p>
                <p>Current Window State: {JSON.stringify(windowCurrState)}</p>
                <p>Numbers: {JSON.stringify(numbers)}</p>
                <p>Average: {avg}</p>
            </div>
        </div>
    );
};

export default AverageCalculator;
