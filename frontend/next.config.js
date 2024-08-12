/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'www.aroma-butik.ru',
            'visagehall.ru',
            'wallpapers.com',
            'media.cntraveller.com',
            'encrypted-tbn0.gstatic.com',
            'localhost',
            'lunacosmetics.onrender.com'  // Remove the protocol (https://)
        ],
    },
}

module.exports = nextConfig
