import Lottie from 'lottie-react-web';
import React from 'react';
import LoadingAnimation from '../../assets/loading.json';
import * as styles from './index.module.scss';

const Loading = () => {
	return (
		<div className={styles.loading}>
			<Lottie
				options={{
					animationData: LoadingAnimation
				}}
			/>
		</div>
	);
};

export default Loading;
