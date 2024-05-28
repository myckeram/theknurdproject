module.exports = {
  siteMetadata: {
    title: 'The Knurd Project',
    author: 'Darkonix, Dri & Laivindil',
    description: 'Podcasts Amadores Anticoloniais',
    siteUrl: 'https://knurd.com.br',
    social: {
      twitter: 'https://twitter.com/TheKnurdProject',
    },
    feed: {
      rss: 'https://feeds.captivate.fm/theknurdproject/',
      apple: 'https://itunes.apple.com/podcast/the-knurd-project/id306468034',
    },
    categories: [
      {
        title: 'Knurd Report',
        feed: {
          rss: 'https://feeds.captivate.fm/theknurdproject/knurdreport/',
          apple: 'https://itunes.apple.com/podcast/knurd-report/id951366219',
        },
      },
      {
        title: 'JCast',
        feed: {
          rss: 'https://feeds.captivate.fm/theknurdproject/jcast/',
          apple: 'https://itunes.apple.com/podcast/jcast/id951366272',
        },
      },
      {
        title: 'Café com Gundam',
        feed: {
          rss: 'https://feeds.captivate.fm/theknurdproject/cafe-com-gundam/',
          apple: 'https://itunes.apple.com/us/podcast/caf%C3%A9-com-gundam/id1425464328',
        },
      },
      {
        title: 'Drunk Report',
        feed: {
          rss: 'https://feeds.captivate.fm/theknurdproject/drunk-report/',
          apple: 'https://podcasts.apple.com/us/podcast/drunk-report/id1522598243'
        },
      }
    ]
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-127078332-1`,
      },
    },
    // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hope in Source`,
        short_name: `Hope in Source`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/icon.jpg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    `gatsby-plugin-twitter`
  ],
}
