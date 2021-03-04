import React from "react"
import { useStaticQuery, graphql, PageProps } from "gatsby"
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from "../lib/helpers"
import Container from "../components/container"
import GraphQLErrorList from "../components/graphql-error-list"
import ProjectPreviewGrid from "../components/project-preview-grid"
import SEO from "../components/seo"
import Layout from "../containers/layout"

interface IndexPageProps {
  errors: any
}

const IndexPage = (props: PageProps & IndexPageProps) => {
  // const { data, errors } = props
  const { errors } = props
  const data = useStaticQuery<
    GatsbyTypes.ArchivePageQueryQuery & { site: GatsbyTypes.SanitySiteSettings }
  >(graphql`
    query IndexPageQuery {
      site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
        title
        subtitle
        description
        keywords
      }
      projects: allSanitySampleProject(
        limit: 6
        sort: { fields: [publishedAt], order: DESC }
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            mainImage {
              crop {
                _key
                _type
                top
                bottom
                left
                right
              }
              hotspot {
                _key
                _type
                x
                y
                height
                width
              }
              asset {
                _id
              }
              alt
            }
            title
            _rawExcerpt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      {
        // <SEO title={site.title} keywords={site.keywords} />
      }
      <Container>
        <h1>Welcome to {site.title}</h1>
        <p>{site.subtitle}</p>
        {projectNodes && (
          <ProjectPreviewGrid
            title="Latest projects"
            nodes={projectNodes}
            browseMoreHref="/archive/"
          />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
