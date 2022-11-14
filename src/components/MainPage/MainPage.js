import React from 'react';
import Form from '../Form/Form';
import Navbar from '../Navbar/Navbar';
import './MainPage.css';
import report from '../../icons/report.png';

function MainPage() {
	return (
		<div>
			<Navbar />
			<div className="main_container">
				<img className="report_image" src={report} alt="weather" width="300px"></img>
				<Form className="form_container" />
			</div>
		</div>
	);
}

export default MainPage;
