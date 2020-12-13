import React, {useState} from 'react';

import {Formik, Form, useField} from 'formik';

import {DateRangePicker} from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';

const DatePicker = () => {
	const [{value: startDate}, _, {setValue: setStartDate}] = useField('startDate');
	const [{value: endDate}, __, {setValue: setEndDate}] = useField('endDate');
	const [focusedInput, setFocusedInput] = useState();

	return (
		<DateRangePicker
			startDate={startDate}
			endDate={endDate}
			onDatesChange={({startDate, endDate}) => {
				setStartDate(startDate);
				setEndDate(endDate);
			}}
			focusedInput={focusedInput}
			onFocusChange={setFocusedInput}
		/>
	);
};

const StockIdInput = () => {
	const [field, _, __] = useField('stockId');
	return (
		<div>
			<label htmlFor="stockId">stocId</label>
			<input {...field} />
		</div>
	);
};

const StockForm = () => {
	return (
		<Formik
			initialValues={{
				stockId: '',
				startDate: undefined,
				endDate: undefined
			}}
			onSubmit={(values, actions) => {
				alert(JSON.stringify(values, null, 2));
			}}
		>
			{props => (
				<Form>
					<StockIdInput />
					<DatePicker />
					<button type="submit">Search</button>
				</Form>
			)}
		</Formik>
	);
};

const Stock = () => {
	return (
		<div>
			<h1>Stock Analysis</h1>
			<StockForm />
		</div>
	);
};

export default Stock;
