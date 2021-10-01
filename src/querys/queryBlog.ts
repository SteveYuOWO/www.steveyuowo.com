import { graphql, useStaticQuery } from "gatsby"

interface IBlogInfo {
  author: {
    node: {
      name: string
    }
  }
  categories: {
    nodes: {
      name: string
    }[]
  }
  date: string
  slug: string
  title: string
}

export const useQueryBlogInfo = (): IBlogInfo[] => {
  return useStaticQuery(graphql`
    query QueryBlogInfo {
      allWpPost {
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
        }
      }
    }
  `)
  .allWpPost
  .nodes as IBlogInfo[]
}