import React, { useEffect } from 'react';
import Layout from '../components/layout';
import { useQueryBlogInfo } from '../querys/queryBlog';
import clsx from 'classnames';
import { Link } from 'gatsby';
import * as queryString from 'query-string';
import * as styles from './index.module.scss';

const useFilterBlogsByParams = (rawBlogs, location) => {
	const { search } = location;
	const { category } = queryString.parse(search);

	if (category) {
		rawBlogs = rawBlogs.filter((blog) =>
			blog.categories.nodes.map((node) => node.name).includes(category as string)
		);
	}
	// query others
	return rawBlogs;
};

const IndexPage = ({ location }) => {
	const rawBlogs = useQueryBlogInfo();

	const categories = rawBlogs
		.reduce((acc, blog) => [ ...acc, ...blog.categories.nodes.map((category) => category.name) ], [])
		.sort((a, b) => a.localeCompare(b))
		.reduce(
			(acc, category) => {
				if (acc.length === 0) return [ category ];
				else return acc[acc.length - 1] === category ? acc : [ ...acc, category ];
			},
			[] as string[]
		);

	const blogs = useFilterBlogsByParams(rawBlogs, location);

	return (
		<Layout title="Homepage" description="steveyuowo - Steve Yu's blog" canonical="/">
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
						<div key="all">
							<Link to="/">all</Link>
						</div>
						{categories.map((category) => (
							<div className={styles.text} key={category}>
								<Link to={`/?category=${category}`}>{category}</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;
