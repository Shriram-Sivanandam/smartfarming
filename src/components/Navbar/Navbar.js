import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener('resize', showButton);

	return (
		<>
			<nav className="navbar">
				<div className="navbar_container">
					<Link to="" className="navbar_logo" onClick={closeMobileMenu} smooth={true} duration={750}>
						Smart Agriculture
					</Link>
					<div className="menu_icon" onClick={handleClick}>
						<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
					</div>
					<ul className={click ? 'nav_menu active' : 'nav_menu'}>
						<li className="nav_item">
							<Link to="info" className="nav_links" onClick={closeMobileMenu} smooth={true} duration={600}>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="main-page" className="nav_links" onClick={closeMobileMenu} smooth={true} duration={1000}>
								Generate Report
							</Link>
						</li>
						<li className="nav-item">
							<Link to="" className="nav_links" onClick={closeMobileMenu} smooth={true} duration={1000}>
								Profile
							</Link>
						</li>
						{/* <li className="nav_item">
							<a
								className="nav_links_mobile"
								href="https://wa.me/918667401982"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div>
									<btn className="btns" buttonStyle="btn--outline" buttonSize="btn--large">
										Contact Us
									</btn>
								</div>
							</a>
						</li> */}
					</ul>
					{button && (
						<a className="nav_links_mobile" href="https://wa.me/918667401982" target="_blank" rel="noopener noreferrer">
							<div>
								<btn className="btns" buttonStyle="btn--outline" buttonSize="btn--large">
									Contact Us
								</btn>
							</div>
						</a>
					)}
				</div>
			</nav>
		</>
	);
}

export default Navbar;
