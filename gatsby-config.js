/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `James' Gatsby Starter`,
    description: `James' personal gatsby starter/boilerplate for all future projects.`,
    author: `James Abaja <jamesabaja.dev@gmail.com>`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.GATSBY_AWS_S3_BUCKET_NAME,
        region: process.env.GATSBY_AWS_S3_REGION,
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        components: `${__dirname}/src/components`,
        elements: `${__dirname}/src/components/Elements`,
        layout: `${__dirname}/src/components/Layout`,
        pages: `${__dirname}/src/pages`,
        services: `${__dirname}/src/services`,
        static: `${__dirname}/src/static`,
      },
    },
    `gatsby-env-variables`,
  ],
}
