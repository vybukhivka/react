import { useState } from "react";

function App() {
	return (
		<div className="app">
			<TipCalulaor />
		</div>
	)
}

function TipCalulaor() {
	const [bill, setBill] = useState('')
	const [percentage1, setPercentage1] = useState(0.1)
	const [percentage2, setPercentage2] = useState(0.1)

	const tip = Math.round(bill * ((percentage1 + percentage2) / 2))

	function handleReset() {
		setBill('')
		setPercentage1('0')
		setPercentage2('0')
	}

	return (
		<>
			<BillInput input={bill} onSetBill={(e) => setBill(Number(e.target.value))} />  
			<SelectPercentage percentage={percentage1} onSetPercentage={(e) => setPercentage1(Number(e.target.value))} children >How did you like the service?</SelectPercentage>
			<SelectPercentage percentage={percentage2} onSetPercentage={(e) => setPercentage2(Number(e.target.value))} children >How did your freind like the service?</SelectPercentage>

			{bill > 0 ? (
				<>
					<Output bill={bill} tip={tip} />
					<Reset onReset={handleReset} />
				</>
			) : null}
		</>
	)
}

function BillInput({input, onSetBill}) {
	return (
		<div>
			<p>How much was the bill? <input type="text" value={input} onChange={onSetBill} /></p>
		</div>
	)
}
function SelectPercentage({percentage, onSetPercentage, children}) {
	return (
		<div>
			<p>{children} <select value={percentage} onChange={onSetPercentage}>
				<option value="0">Dissatisfied (0%)</option>
				<option value="0.05">It was okay (5%)</option>
				<option value="0.1">It was good (10%)</option>
				<option value="0.2">Absolutely amazing! (20%)</option>
			</select></p>
		</div>
	)
}
function Output({bill, tip}) {
	return <h3>You pay ${bill + tip} (${bill} + ${tip} percentage)</h3>
}
function Reset({onReset}) {
	return <button onClick={onReset}>Reset</button>
}

export default App;
