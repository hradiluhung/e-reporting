/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["res.cloudinary.com", "api.dicebear.com"],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }

    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?ts/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            publicPath: "_next/static/worker",
            outputPath: "static/worker",
          },
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
