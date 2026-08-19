import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Built-in API plugin to save admin changes directly to src/siteData.json on disk
function siteDataApiPlugin() {
  return {
    name: 'site-data-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/save-site-data' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const filePath = path.resolve(__dirname, 'src/siteData.json');
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Saved directly to src/siteData.json on disk!' }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteDataApiPlugin()],
  base: './',
  server: {
    port: 5173,
    host: true,
  },
});
