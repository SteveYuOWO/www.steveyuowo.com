import React from 'react';
import Layout from '../components/layout';
import { useQueryBlogInfo } from '../querys/queryBlog';
import clsx from 'classnames';
import { Link } from 'gatsby';
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
				<div className={clsx(styles.articles, 'shadow')}>
					<div className={styles.article}>
						<h2>Articles</h2>
						<ul>
							{blogs.map((blog) => (
								<Link key={blog.slug} to={`/archive/${blog.slug}`}>
									<li>
										<div className={styles.articleInfos}>
											{blog.date}
											{blog.categories.nodes.map((category) => `, ${category.name}`)}
										</div>
										<h3>{blog.title}</h3>
									</li>
								</Link>
							))}
						</ul>
					</div>
				</div>
				<div className={clsx(styles.categories, 'shadow')}>
					<h2>Categories</h2>
					<div className={styles.category}>
						{categories.map((category) => (
							<Link key={category} to={`/category/${category}`}>
								<div>{category}</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;
