module.exports = {
  async headers() {
    return [
      {
        source: "/(robots.txt|sitemap.xml)",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
    ];
  },
};
