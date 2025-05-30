/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false // false nếu bạn chỉ muốn tạm thời (phục vụ dev/test)
      }
    ]
  }
}

module.exports = nextConfig
