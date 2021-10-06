import React, { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './footer';
import Header from './header';
import ShareImage from '../../assets/share.png';
import Loading from './loading';
import clsx from 'classnames';

interface ILayout {
	children: any;
	title: string;
	description: string;
	canonical: string;
	task?: Promise<any>;
	// when trigger loading changed, loading will occur
	triggerLoading?: boolean;
}

const Layout: FC<ILayout> = ({ children, title, description, canonical, task, triggerLoading }) => {
	const host = 'https://www.steveyuowo.com';

	const [ loading, setLoading ] = useState(true);

	// loading and doing tasks
	useEffect(
		() => {
			setLoading(true);
			const delayTimeout = setTimeout(() => {
				if (task) {
					task.then(() => {
						setLoading(false);
					});
				} else {
					setLoading(false);
				}
			}, 300);
			return () => clearTimeout(delayTimeout);
		},
		[ task, triggerLoading ]
	);
	return (
		<div>
			<Helmet
				htmlAttributes={{
					lang: 'zh-Hans'
				}}
			>
				{/* basic */}
				<meta charSet="utf-8" />
				<title>Steve Yu's Blog - {title}</title>
				<meta name="description" content={description} />
				<link rel="canonical" href={`${host}${canonical}`} />
				{/* open graph */}
				<meta property="og:url" content={`${host}${canonical}`} />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={`Steve Yu's Blog - ${title}`} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={`${host}${ShareImage}`} />
				{/* twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@steveyuowo" />
				<meta name="twitter:creator" content="@steveyu" />
				<meta name="twitter:image" content={`${host}${ShareImage}`} />
			</Helmet>
			{loading && <Loading />}
			<div className={clsx(loading && 'blur')}>
				<Header />
				<main>{children}</main>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
