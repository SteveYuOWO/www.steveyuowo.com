import React from 'react';
import Layout from '../components/layout';
import { useQueryBlogInfo } from '../querys/queryBlog';
import clsx from 'classnames';
import * as styles from './index.module.scss';

const IndexPage = () => {
	const blogs = useQueryBlogInfo();

	const categories = blogs
		.reduce((acc, blog) => [ ...acc, ...blog.categories.nodes.map((category) => category.name) ], [])
		.sort((a, b) => a.localeCompare(b))
		.reduce(
			(acc, category) => {
				if (acc.length === 0) return [ category ];
				else return acc[acc.length - 1] === category ? acc : [ ...acc, category ];
			},
			[] as string[]
		);

	return (
		<Layout>
			<div className={styles.container}>
				<ul className={clsx(styles.articles, 'shadow')}>
					{blogs.map((blog) => (
						<li key={blog.slug} className={styles.article}>
							<li>
								{blog.date}
								{blog.categories.nodes.map((category) => `, ${category.name}`)}
							</li>
							<h2>{blog.title}</h2>
						</li>
					))}
				</ul>
				<div className={clsx(styles.categories, 'shadow')}>
					{categories.map((category) => <div key={category}>{category}</div>)}
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;
