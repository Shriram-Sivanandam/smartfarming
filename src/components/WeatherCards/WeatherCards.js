import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './WeatherCards.css';
import rain from '../../icons/rain.png';
import moisture from '../../icons/moisturizing.png';
import soilMoisture from '../../icons/soil-analysis.png';
import umbrella from '../../icons/umbrella.png';
import animal from '../../icons/livestock.png';
import 'firebase/database';
import firebase from 'firebase/app';

const db = firebase.database();

function WeatherCards() {
	const [moistureValue, setMoistureValue] = useState(0);
	const [rainfallValue, setRainfallValue] = useState(0);
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
				setRainfallValue(rfValue.AG);
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

	return (
		<div className="weather_mainContainer">
			<Navbar />
			<div className="cards_container">
				<div class="card mb-4 gradient-custom weather_card">
					<div class="card-body p-4">
						<div id="demo1" class="carousel slide" data-ride="carousel">
							<ul class="carousel-indicators mb-0">
								<li data-target="#demo1" data-slide-to="0" class="active"></li>
								<li data-target="#demo1" data-slide-to="1"></li>
								<li data-target="#demo1" data-slide-to="2"></li>
							</ul>
							<div class="carousel-inner">
								<div class="carousel-item active">
									<div class="d-flex justify-content-between mb-4 pb-2">
										<div>
											<h2 class="display-2">
												<strong>{temperatureValue}°C</strong>
											</h2>
											<h4 class="text-muted mb-0">Temperature</h4>
										</div>
										<div>
											<img
												src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp"
												alt="weather"
												width="150px"
											></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card mb-4 gradient-custom weather_card">
					<div class="card-body p-4">
						<div id="demo1" class="carousel slide" data-ride="carousel">
							<ul class="carousel-indicators mb-0">
								<li data-target="#demo1" data-slide-to="0" class="active"></li>
								<li data-target="#demo1" data-slide-to="1"></li>
								<li data-target="#demo1" data-slide-to="2"></li>
							</ul>
							<div class="carousel-inner">
								<div class="carousel-item active">
									<div class="d-flex justify-content-between mb-4 pb-2">
										<div>
											<h2 class="display-2">
												<strong>{humidityValue}%</strong>
											</h2>
											<h4 class="text-muted mb-0">Humidity</h4>
										</div>
										<div>
											<img src={moisture} alt="weather" width="150px"></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="cards_container">
				<div class="card mb-4 gradient-custom weather_card">
					<div class="card-body p-4">
						<div id="demo1" class="carousel slide" data-ride="carousel">
							<ul class="carousel-indicators mb-0">
								<li data-target="#demo1" data-slide-to="0" class="active"></li>
								<li data-target="#demo1" data-slide-to="1"></li>
								<li data-target="#demo1" data-slide-to="2"></li>
							</ul>
							<div class="carousel-inner">
								<div class="carousel-item active">
									<div class="d-flex justify-content-between mb-4 pb-2">
										<div>
											<h2 class="display-2">
												<strong>{rainfallValue}</strong>
											</h2>
											<h4 class="text-muted mb-0">Rainfall</h4>
										</div>
										<div>
											<img src={rain} alt="weather" width="120px"></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card mb-4 gradient-custom weather_card">
					<div class="card-body p-4">
						<div id="demo1" class="carousel slide" data-ride="carousel">
							<ul class="carousel-indicators mb-0">
								<li data-target="#demo1" data-slide-to="0" class="active"></li>
								<li data-target="#demo1" data-slide-to="1"></li>
								<li data-target="#demo1" data-slide-to="2"></li>
							</ul>
							<div class="carousel-inner">
								<div class="carousel-item active">
									<div class="d-flex justify-content-between mb-4 pb-2">
										<div>
											<h2 class="display-2">
												<strong>{isRaining}</strong>
											</h2>
											<h4 class="text-muted mb-0">Raining?</h4>
										</div>
										<div>
											<img src={umbrella} alt="weather" width="150px"></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="cards_container">
				<div class="card mb-4 gradient-custom weather_card">
					<div class="card-body p-4">
						<div id="demo1" class="carousel slide" data-ride="carousel">
							<ul class="carousel-indicators mb-0">
								<li data-target="#demo1" data-slide-to="0" class="active"></li>
								<li data-target="#demo1" data-slide-to="1"></li>
								<li data-target="#demo1" data-slide-to="2"></li>
							</ul>
							<div class="carousel-inner">
								<div class="carousel-item active">
									<div class="d-flex justify-content-between mb-4 pb-2">
										<div>
											<h2 class="display-2">
												<strong>{moistureValue}%</strong>
											</h2>
											<h4 class="text-muted mb-0">Soil Moisture</h4>
										</div>
										<div>
											<img src={soilMoisture} alt="weather" width="150px"></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card mb-4 gradient-custom weather_card">
					<div class="card-body p-4">
						<div id="demo1" class="carousel slide" data-ride="carousel">
							<ul class="carousel-indicators mb-0">
								<li data-target="#demo1" data-slide-to="0" class="active"></li>
								<li data-target="#demo1" data-slide-to="1"></li>
								<li data-target="#demo1" data-slide-to="2"></li>
							</ul>
							<div class="carousel-inner">
								<div class="carousel-item active">
									<div class="d-flex justify-content-between mb-4 pb-2">
										<div>
											<h2 class="display-2">
												<strong>{animalIntrusion}</strong>
											</h2>
											<h4 class="text-muted mb-0">Animal Intrusion</h4>
										</div>
										<div>
											<img src={animal} alt="weather" width="120px"></img>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WeatherCards;
