// next.config.js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',               // Specify the protocol (http or https)
        hostname: 'files.edgestore.dev', // Your external image host
      
      },
    ],
  },
}
