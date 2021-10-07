---
title: Sample Post Testing Algolia
date: "2021-05-16"
description: "An Algolia Test"
---
Below is not my text. It was chosen because it is a post adout adding Algolia Search to a Gatsby site. Since I am testing Algolia I felt this was appropriate to "borrow".

This post is a guide on how to write a React component that implements custom search powered by [Algolia](https://algolia.com) on a [Gatsby](https://gatsbyjs.org) site. You can see the result in action by clicking on the search icon in the top right of this page. The complete code is on [GitHub](https://github.com/janosh/blog/tree/main/src/components/Search). Also, check out Algolia's CodeSandbox on how to use their [React Instantsearch](https://codesandbox.io/s/github/algolia/create-instantsearch-app/tree/templates/react-instantsearch) library.

If you're looking to add search to a documentation site with highly structured content, then you can let Algolia handle the steps outlined in the backend section for you by using their excellent [Docsearch](https://community.algolia.com/docsearch). For other types of sites and more fine-grained control over exactly what data should be indexed, read on.

## Backend

First, you'll need to add [`gatsby-plugin-algolia`](https://github.com/algolia/gatsby-plugin-algolia) and [`react-instantsearch-dom`](https://github.com/algolia/react-instantsearch) to your project. `react-instantsearch` is Algolia's library containing off-the-shelf React components which we can import to save ourselves a lot of work. If you're not using it already, also install [`dotenv`](https://github.com/motdotla/dotenv) while you're at it. We're going to need it to specify your Algolia app ID and both the search and admin API keys without committing them to version control.

```sh
yarn add gatsby-plugin-algolia react-instantsearch-dom dotenv
```

If your project doesn't use them already, you will also need to install `react` and `styled-components`. The latter is optional but you will then have to convert some styled-components to whichever design approach you use.

```sh
yarn add react styled-components
```

Next, add `gatsby-plugin-algolia` to your `gatsby-config.js`.

```js:title=gatsby-config.js
const queries = require('./src/utils/algolia')

require('dotenv').config()

module.exports = {
	siteMetadata: {
		title: `Gatsby+Algolia`,
		description: `How to setup Algolia search in Gatsby`,
		author: `Janosh Riebesell`,
	},
	plugins: [
		{
			resolve: `gatsby-plugin-algolia`,
			options: {
				appId: process.env.GATSBY_ALGOLIA_APP_ID,
				apiKey: process.env.ALGOLIA_ADMIN_KEY,
				queries,
				chunkSize: 10000, // default: 1000
			},
		},
	],
}
```

Notice that we're loading `queries` from a file at `./src/utils/algolia.js` (you can of course put it wherever you like) and our Algolia ID and API key from `.env` so let's add those files.

```sh:title=.env
GATSBY_ALGOLIA_APP_ID = KA4OJA9KAS
GATSBY_ALGOLIA_SEARCH_KEY=lkjas987ef923ohli9asj213k12n59ad
ALGOLIA_ADMIN_KEY = lksa09sadkj1230asd09dfvj12309ajl
```

These are random character sequences but yours should be the same length. Also, it's good practice to commit a `.env.example` to version control so that if someone forks your repo, they know which environment variables they need to supply.

```sh:title=.env.example
# rename this file to .env and supply the values listed below
# also make sure they are available to the build tool (e.g. netlify)
# warning: variables prefixed with GATSBY_ will be made available to client-side code
# be careful not to expose sensitive data (in this case your Algolia admin key)

GATSBY_ALGOLIA_APP_ID=insertValue
GATSBY_ALGOLIA_SEARCH_KEY=insertValue
ALGOLIA_ADMIN_KEY=insertValue
```

The `queries` allow you to grab the data you want Algolia to index directly from Gatsby's GraphQL layer by exporting from `src/utils/algolia.js` an array of objects, each containing a required GraphQL query and an optional index name, transformer function and settings object.

```js:title=src/utils/algolia.js
const queryTemplate = (filters = ``, fields = ``) => `{
	allMdx(filter: {${filters}}) {
		nodes {
			objectID: id
			frontmatter {
				title
				slug
				${fields}
			}
			excerpt(pruneLength: 5000)
		}
	}
}`

const flatten = arr =>
	arr.map(({ frontmatter, ...rest }) => ({ ...frontmatter, ...rest }))

const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
	{
		query: queryTemplate(`frontmatter: {purpose: {eq: "page"}}`),
		transformer: res => flatten(res.data.allMdx.nodes),
		indexName: `Pages`,
		settings,
	},
	{
		query: queryTemplate(
			`fileAbsolutePath: {regex: "/posts/"}`,
			`tags date(formatString: "MMM D, YYYY")`
		),
		transformer: res => flatten(res.data.allMdx.nodes),
		indexName: `Posts`,
		settings,
	},
]

module.exports = queries
```

It might look a little intimidating at first, but basically, you're just letting `gatsby-plugin-algolia` know how to acquire the data with which to populate your indices on their servers. The example above uses separate queries passing data to separate indices for pages and blog posts.

