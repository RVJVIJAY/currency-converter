import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('INR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState();
    const [convertedAmount, setConvertedAmount] = useState();

    useEffect(() => {
        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const rate = response.data.rates[toCurrency];
            console.log(response.data)
            console.log(rate)
            setExchangeRate(rate);
            setConvertedAmount((amount * rate).toFixed(2));
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    const handleFromAmountChange = (e) => {
        setAmount(e.target.value);
        setConvertedAmount((e.target.value * exchangeRate).toFixed(2));
    };

    return (
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            <div>
                <input type="number" value={amount} onChange={handleFromAmountChange} />
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="INR">INR</option>
                    {/* Add more currencies as needed */}
                </select>
            </div>
            <div>
                <p>Equals</p>
                <h2>{convertedAmount} {toCurrency}</h2>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="INR">INR</option>
                    {/* Add more currencies as needed */}
                </select>
            </div>
        </div>
    );
}

export default CurrencyConverter;
