import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net', // 카카오 프로필 이미지 도메인
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // 구글 프로필 이미지도 대비해서 추가
        port: '',
        pathname: '/**',
      },
      // 슈파베이스 스토리지 이미지를 쓴다면 이것도 추가
      // {
      //   protocol: 'https',
      //   hostname: 'mcnzpomdtxdjefefjarq.supabase.co',
      //   port: '',
      //   pathname: '/storage/v1/object/public/**',
      // },
    ],
  },
};

export default nextConfig;

