/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 ignora los errores de ESLint en producción, SOLUCION DEPLOY EN ROUTE TS
  },
};

module.exports = nextConfig; 