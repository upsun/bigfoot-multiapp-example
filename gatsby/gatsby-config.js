/**
 * @type {import('gatsby').GatsbyConfig}
 */

let backendURL = "https://localhost:8000/api/graphql"
let pathPrefix = '/';
let siteUrl = 'http://localhost:8080/';

// Helper function to decode base64 JSON variables on Upsun
function decode(value) {
  return JSON.parse(Buffer.from(value, 'base64'));
}

// Update the backend URL for the current environment if on Upsun.
if ('PLATFORM_ROUTES' in process.env) {

  console.log('On an Upsun Environment');
  var data = decode(process.env.PLATFORM_ROUTES)
  const result = Object.entries(data)
      .filter(([key, value]) => value.upstream === "api")
      .map(([key, value]) => key)
  pathPrefix = '/site'
  siteUrl = `${result[0]}site`;
  backendURL = `${result[0]}api/graphql`

} else {
  console.log('Running locally.');
}

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    title: `Sasquatch Sightings`,
    siteUrl: siteUrl,
    author: `Upsun DevRel`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "Bigfoot",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "bigFootSightings",
        // Url to query from
        url: backendURL,
      },
    },
  ],
}