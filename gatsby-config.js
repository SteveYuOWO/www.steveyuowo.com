module.exports = {
	siteMetadata: {
		siteUrl: 'https://www.steveyuowo.com',
		title: 'steveyuowo',
		author: 'steve yu',
		email: 'steveyuowo@gmail.com'
	},
	plugins: [
		{
			resolve: 'gatsby-source-wordpress',
			options: {
				url: 'http://steveyuowo.local/graphql'
			}
		},
		{
			resolve: 'gatsby-plugin-sass',
			options: {
				additionalData: `@import "./src/scss/_variables";`
			}
		},
		'gatsby-plugin-image',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/assets/profile.png'
			}
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'assets',
				path: './src/assets/'
			}
		},
		{
			resolve: 'gatsby-plugin-typescript',
			options: {
				isTSX: true, // defaults to false
				jsxPragma: `jsx`, // defaults to "React"
				allExtensions: true // defaults to false
			}
		}
	]
};
