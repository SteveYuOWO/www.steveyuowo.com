import { graphql, useStaticQuery } from "gatsby"

export const useQueryNavLinkImages = () => {
  const images = useStaticQuery(graphql`
    query NavLinkImages {
      allFile(filter: {dir: {regex: "/links/"}}) {
        nodes {
          name
          publicURL
          dir
        }
      }
    }
  `)
    .allFile
    .nodes
    .reduce((acc, node) => (
      { ...acc, [node.name]: node.publicURL }),
      {}
    )
  return images;
}
