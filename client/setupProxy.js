// frontend/setupProxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://server.ldtaxgovbd.com', // Replace this with your backend URL
      changeOrigin: true,
    })
  );
}
