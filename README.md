<img src="./src/assets/profile.png" width="250" height="auto"/>

## 💡 Quick Start

1. **Start a wordpress instance in local**

Install plugin `WP Gatsby`, `WP GraphQL`, and change `gatsby-config.js`

```json
{
  resolve: 'gatsby-source-wordpress',
  options: {
  	url: 'http://steveyuowo.local/graphql'
  }
}
```

Replace the URL to `http://${YOUR_INSTANCE_NAME}/graphql`

2. **Start building**

Build the blog applications.

```shell
# use npm
npm run build
# use yarn
yarn build
```

3. **Start developing.**

Navigate into your new site’s directory and start it up.

```shell
# use npm
npm run develop
# use yarn
yarn develop
# if you used to use `start`, you can run like this.
npm run start
yarn start
```

4. **Open the blog**

Your site is now running at `http://localhost:8000`!
