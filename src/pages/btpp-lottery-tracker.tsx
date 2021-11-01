import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as styles from './btpp-lottery-tracker.module.scss';
import apiKey from '../../.apikey';
import Loading from '../components/layout/loading';
import classNames from 'classnames';

const PTPPTracker = () => {
	const [ lotteryRecords, setLotteryRecords ] = useState([]);
	const [ noLotteryRecords, setNoLotteryRecords ] = useState([]);
	const [ lotteryWinCounts, setLotteryWinCounts ] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(lotteryRecords.length && noLotteryRecords.length && lotteryWinCounts.length) {
      setLoading(false);
    }
  }, [lotteryRecords, noLotteryRecords, lotteryWinCounts])

	useEffect(() => {
		const etherScanApikey = apiKey.etherScan;
		if (!etherScanApikey) {
			throw new Error('No etherscan api key, please put it to .apikey.js file, key is `etherScan`');
		}
		axios
			.get(
				`https://api.etherscan.io/api?module=account&action=tokentx&address=0xbebe03d890a535fd2427358eb030996cfe456ed7&startblock=0&endblock=999999999&sort=asc&apikey=${etherScanApikey}`
			)
			.then((res) => {
				const allTxRecords = res.data.result.reverse();
				const lotteryCalculateRecords = allTxRecords.filter(
					(record) => record.from === '0xbebe03d890a535fd2427358eb030996cfe456ed7'
				);
				setLotteryRecords(lotteryCalculateRecords);
				setNoLotteryRecords(
					allTxRecords.filter((record) => record.to === '0xbebe03d890a535fd2427358eb030996cfe456ed7')
				);
				const lotteryWinCountsObject = lotteryCalculateRecords.reduce(
					(acc, record) =>
						acc[record.to] ? { ...acc, [record.to]: acc[record.to] + 1 } : { ...acc, [record.to]: 1 },
					{}
				);

				setLotteryWinCounts(
					Object.keys(lotteryWinCountsObject).map((address) => ({
						address: address,
						count: lotteryWinCountsObject[address]
					})).sort((a, b) => (a.count === b.count) ? (a.address.localeCompare(b.address)): (b.count - a.count))
				);
			});
	}, []);
	return (
		<section>
			<Helmet
				htmlAttributes={{
					lang: 'en'
				}}
			>
				{/* basic */}
				<meta charSet="utf-8" />
				<title>BTPP Lottery Tracker</title>
				<meta name="description" content="BTPP Lottery Tracker" />
				<link rel="canonical" href="https://www.steveyuowo.com/btpp-lottery-tracker" />
				{/* open graph */}
				<meta property="og:url" content="https://www.steveyuowo.com/btpp-lottery-tracker" />
				<meta property="og:type" content="article" />
				<meta property="og:title" content="BTPP Lottery Tracker" />
				<meta property="og:description" content="BTPP Lottery Tracker" />
				<meta
					property="og:image"
					content="https://buttpoop.com/wp-content/uploads/2021/06/buttpoopseethru.png"
				/>
				{/* twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@steveyuowo" />
				<meta name="twitter:creator" content="@steveyu" />
				<meta
					name="twitter:image"
					content="https://buttpoop.com/wp-content/uploads/2021/06/buttpoopseethru.png"
				/>
			</Helmet>
			<main className={classNames(styles.main, loading && "blur")}>
				<h1 className={styles.title}>BTPP Lottery Tracker</h1>
				<div>
					<img src="https://buttpoop.com/wp-content/uploads/2021/06/buttpoopseethru.png" />
				</div>
        <div className={styles.summary}>
          <p>
            Lottery records count: {lotteryRecords.length}
          </p>
          <p>
            Max win count: {lotteryWinCounts[0]?.count} 
          </p>
        </div>

				<h2 className={styles.table_title}>Lottery win counts list</h2>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Address</th>
							<th>Win count</th>
						</tr>
					</thead>
					<tbody>
						{lotteryWinCounts.map((winCount, index) => (
							<tr key={index}>
								<td>{winCount.address}</td>
								<td>{winCount.count}</td>
							</tr>
						))}
					</tbody>
				</table>

				<h2 className={styles.table_title}>Winners list</h2>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Block number</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
						{lotteryRecords.map((lotteryRecord, index) => (
							<tr key={index}>
								<td>{lotteryRecord.blockNumber}</td>
								<td>{lotteryRecord.to}</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
      {loading && <Loading />}
		</section>
	);
};

export default PTPPTracker;
