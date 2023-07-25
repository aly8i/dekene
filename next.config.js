/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains:["firebasestorage.googleapis.com",`${process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET}`,"images.app.goo.gl","lh3.googleusercontent.com"]
  },
}

module.exports = nextConfig
