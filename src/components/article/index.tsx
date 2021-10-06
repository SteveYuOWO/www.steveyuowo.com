import React from 'react';
import Layout from '../layout';
import clsx from 'classnames';
import * as styles from './styles.module.scss';

function Article({ pageContext }) {
	const { title, slug, date, content, categories, author } = pageContext;

	return (
		<Layout>
			<section className={styles.container}>
				<div className={clsx(styles.article, 'shadow', 'markdown-body')}>
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</div>
			</section>
		</Layout>
	);
}

export default Article;
