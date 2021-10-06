const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    query QueryBlogInfo {
      allWpPost(sort: {fields: date}) {
        nodes {
          title
          date(formatString: "yyyy.MM.DD")
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
            }
          }
          slug
          content
        }
      }
    }
  `).then(result => {
    if (result.errors) throw result.errors

    result.data.allWpPost.nodes.forEach(node => {
      createPage({
        path: `/archive/${node.slug}`,
        component: path.resolve('src/components/article/index.tsx'),
        context: {
          title: node.title,
          date: node.date,
          author: node.author.node.name,
          categories: node.categories.nodes,
          slug: node.slug,
          content: node.content,
          canonical: `/archive/${node.slug}`
        }
      })
    })
  })
}