import React from 'react';
import * as styles from './index.module.scss';
import Profile from '../../assets/profile.png';
import { useQueryNavLinkImages } from '../../querys/queryImages';
import { navLinks } from './constants';

function Header() {
	const navLinkImages = useQueryNavLinkImages();
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.left}>
					<h1>Steve Yu</h1>
					<p>Frontend developer &amp; record my thoughts</p>
					<div>
						{navLinks.map((navLink) => (
							<a
								className={styles.navlink}
								key={navLink.name}
								href={navLink.url}
								target="_blank"
								rel="noopener"
							>
								<img src={navLinkImages[navLink.name]} alt={navLink.name} width="25px" height="25px" />
							</a>
						))}
					</div>
				</div>
				<div className={styles.right}>
					<img src={Profile} alt="profile" width="100%" height="100%" />
				</div>
			</div>
		</header>
	);
}

export default Header;
