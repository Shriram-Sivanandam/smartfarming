import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import 'firebase/database';
import firebase from 'firebase/app';
import './Form.css';

const db = firebase.database();

const currentDate = new Date();
const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
const curTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();

function Form() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [moistureValue, setMoistureValue] = useState(0);
	const [humidityValue, setHumidityValue] = useState(0);
	const [temperatureValue, setTemperatureValue] = useState(0);
	const [animalIntrusion, setanimalIntrusion] = useState('False');
	const [isRaining, setIsRaining] = useState('False');

	useEffect(() => {
		const rainfallRef = db.ref('RF');
		const moistureRef = db.ref('SM');
		const dhtRef = db.ref('HS');
		const animalRef = db.ref('PIR');

		rainfallRef.on(
			'value',
			(snapshot) => {
				const rfValue = snapshot.val();
				if (rfValue.AG < 4000) {
					setIsRaining('True');
				} else {
					setIsRaining('False');
				}
			},
			(errorObject) => {
				console.log('The read failed: ' + errorObject.name);
			}
		);

		dhtRef.on(
			'value',
			(snapshot) => {
				const rfValue = snapshot.val();
				setHumidityValue(rfValue.Hum);
				setTemperatureValue(rfValue.Temp);
			},
			(errorObject) => {
				console.log('The read failed: ' + errorObject.name);
			}
		);

		moistureRef.on(
			'value',
			(snapshot) => {
				const smValue = snapshot.val();
				setMoistureValue(smValue);
			},
			(errorObject) => {
				console.log('The read failed: ' + errorObject.name);
			}
		);

		animalRef.on(
			'value',
			(snapshot) => {
				const pirValue = snapshot.val();
				if (pirValue === 1) {
					setanimalIntrusion('True');
				} else {
					setanimalIntrusion('False');
				}
			},
			(errorObject) => {
				console.log('The read failed: ' + errorObject.name);
			}
		);
	});

	const templateParams = {
		name: name,
		email: email,
		date: date,
		time: curTime,
		temperature: temperatureValue,
		humidity: humidityValue,
		moisture: moistureValue,
		rain: isRaining,
		animal: animalIntrusion,
	};

	function sendEmail(e) {
		e.preventDefault();

		emailjs.send('service_h91fzta', 'template_uxmrwu6', templateParams, 'user_ecruCvVcl9HQPDdzCalcx').then(
			function (response) {
				console.log('SUCCESS!', response.status, response.text);
				setName('');
				setEmail('');
				alert('Email sent successfully!');
			},
			function (error) {
				console.log('FAILED...', error);
			}
		);
		e.target.reset();
	}

	return (
		<div>
			<div className="container">
				<form className="contact-form" onSubmit={sendEmail}>
					<div className="form__element">
						<label>Name</label>
						<input
							type="text"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="Your Name..."
							name="name"
							required
						></input>
					</div>
					<div className="form__element">
						<label>Email</label>
						<input
							type="text"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder="Your Email..."
							name="email"
							required
						></input>
					</div>
					<div className="form__btns">
						<input className="btns" type="submit" value="Send Message"></input>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Form;
