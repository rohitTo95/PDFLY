# 🚀 Deployment Guide

This guide covers different deployment strategies for PDFY.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository access
- Environment variables configured
- Domain name (for production)

## 🏗️ Build Process

### 1. Prepare for Production

```bash
# 1. Clone and install dependencies
git clone https://github.com/your-username/pdfy.git
cd pdfy

# 2. Install client dependencies
cd client && npm install

# 3. Install server dependencies
cd ../server && npm install
```

### 2. Environment Configuration

```bash
# Client environment
cd client
cp .env.example .env
# Edit .env with production values

# Server environment
cd ../server
cp .env.example .env
# Edit .env with production values
```

### 3. Build the Client

```bash
cd client
npm run build
# This creates a 'dist' folder with optimized static files
```

## ☁️ Deployment Options

### Option 1: Vercel (Recommended for Frontend)

#### Client Deployment

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your GitHub repository
   - Select the `client` folder as root directory

2. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Environment Variables**
   Add in Vercel dashboard:
   ```
   VITE_SUPABASE_URL=your_production_url
   VITE_SUPABASE_ANON_KEY=your_production_key
   VITE_API_BASE_URL=your_server_url
   ```

4. **Custom Domain**
   - Add your domain in Vercel settings
   - Configure DNS records

### Option 2: Netlify

#### Client Deployment

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://netlify.com)
   - Connect GitHub repository

2. **Build Settings**
   ```
   Base directory: client
   Build command: npm run build
   Publish directory: client/dist
   ```

3. **Environment Variables**
   Add in Netlify dashboard under Site settings > Environment variables

### Option 3: Railway (Recommended for Backend)

#### Server Deployment

1. **Connect Repository**
   - Go to [Railway Dashboard](https://railway.app)
   - Deploy from GitHub

2. **Configuration**
   ```
   Root Directory: server
   Build Command: npm run build
   Start Command: npm start
   ```

3. **Environment Variables**
   Add in Railway dashboard

### Option 4: Digital Ocean / AWS / Google Cloud

#### Using Docker

1. **Create Dockerfile for Client**
   ```dockerfile
   # client/Dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create Dockerfile for Server**
   ```dockerfile
   # server/Dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

3. **Docker Compose**
   ```yaml
   # docker-compose.yml
   version: '3.8'
   services:
     client:
       build: ./client
       ports:
         - "80:80"
       environment:
         - VITE_API_BASE_URL=http://server:5000
     
     server:
       build: ./server
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=production
   ```

### Option 5: Traditional VPS

#### Ubuntu Server Setup

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install Nginx
   sudo apt install nginx -y
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/pdfy.git
   cd pdfy
   
   # Build client
   cd client
   npm install
   npm run build
   
   # Setup server
   cd ../server
   npm install
   npm run build
   
   # Start with PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   # /etc/nginx/sites-available/pdfy
   server {
       listen 80;
       server_name your-domain.com;
       
       # Serve client files
       location / {
           root /path/to/pdfy/client/dist;
           try_files $uri $uri/ /index.html;
       }
       
       # Proxy API requests to backend
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 Production Optimizations

### Client Optimizations

1. **Build Optimization**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             router: ['react-router-dom'],
             pdf: ['react-pdf'],
           },
         },
       },
       target: 'esnext',
       minify: 'terser',
     },
   });
   ```

2. **Performance Settings**
   - Enable gzip compression
   - Set up CDN for static assets
   - Configure caching headers
   - Use lazy loading for routes

### Server Optimizations

1. **Production Mode**
   ```bash
   NODE_ENV=production
   ```

2. **Process Management**
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'pdfy-server',
       script: './dist/server.js',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'development'
       },
       env_production: {
         NODE_ENV: 'production'
       }
     }]
   };
   ```

## 🔒 Security Considerations

### SSL/TLS Certificate

1. **Let's Encrypt (Free)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

2. **Automatic Renewal**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

### Security Headers

```nginx
# Add to Nginx configuration
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## 📊 Monitoring

### Application Monitoring

1. **PM2 Monitoring**
   ```bash
   pm2 monit
   pm2 logs
   ```

2. **Health Checks**
   ```bash
   # Setup health check endpoint
   curl http://your-domain.com/api/health
   ```

### Error Tracking

Consider integrating:
- Sentry for error tracking
- Google Analytics for usage analytics
- Uptime monitoring services

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install and Build
        run: |
          cd client && npm install && npm run build
          cd ../server && npm install && npm run build
          
      - name: Deploy to Vercel
        uses: vercel/action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify environment variables
   - Clear npm cache: `npm cache clean --force`

2. **PDF Worker Issues**
   - Ensure CDN access for PDF.js worker
   - Check Content Security Policy settings

3. **API Connection Issues**
   - Verify CORS settings
   - Check API URL configuration
   - Ensure server is running

### Logs and Debugging

```bash
# Client build logs
cd client && npm run build --verbose

# Server logs
cd server && npm run start --verbose

# PM2 logs
pm2 logs pdfy-server
```

---

🎉 **Congratulations!** Your PDFY application should now be successfully deployed!
