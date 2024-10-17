// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
	const [amount, setAmount] = useState(0)
	const [inputCur, setInputCur] = useState('USD')
	const [outputCur, setOutputCur] = useState('EUR')
	const [exchangeResult, setExchangeResult] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleInputValue = (e) => {
		!isNaN(Number(e.target.value)) && setAmount(Number(e.target.value))
	}

	useEffect(() => {
		const controller = new AbortController()

		async function fetchExchange() {
			try {
				setIsLoading(true)
				const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${inputCur}&to=${outputCur}`, { signal: controller.signal })
				const data = await res.json()
				setExchangeResult(data.rates[outputCur])
				setIsLoading(false)
			} catch (e) {
				console.error(e.message)
			}
		}
		if(amount === 0) return setExchangeResult(0)
		if(inputCur === outputCur) return setExchangeResult(amount)

		fetchExchange()
	}, [amount, inputCur, outputCur])

  return (
    <div>
      <input type="text" value={amount} onChange={handleInputValue} />
      <select value={inputCur} onChange={(e) => setInputCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={outputCur} onChange={(e) => setOutputCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? "Loading..." : `${exchangeResult} ${outputCur}`}</p>
    </div>
  );
}

