module.exports = {
  siteMetadata: {
    title: 'Casilleros Adidas',
    description: 'Memorice Casilleros Adidas',
    author: '@diversivocl',
    menuLinks: [
      {
        name: 'Game',
        link: '/game ',
      }
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'diversivo-website',
        short_name: 'starter',
        start_url: '/',
        background_color: '#1c1c1c',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/assets/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/assets/svg/`, // See below to configure properly
        },
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'adidas-memo',
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-gtag`,
    //   options: {
    //     // You can add multiple tracking ids and a pageview event will be fired for all of them.
    //     trackingIds: [
    //       "G-Y1GY6JHD62", // Google Analytics / GA
    //     ],
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-tawk`,
    //   options: {
    //     tawkId: "5f563a7bf0e7167d000e1a94",
    //     // get this from the tawk script widget
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
