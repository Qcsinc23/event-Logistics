# Vercel Deployment Guide

This guide will help you deploy the Quiet Craft Solutions website to Vercel.

## 🚀 Quick Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `Qcsinc23/event-Logistics`

3. **Configure Project**
   - **Project Name**: `quiet-craft-solutions`
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install` (optional)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be available at: `https://quiet-craft-solutions.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   cd /path/to/your/project
   vercel --prod
   ```

## 🔧 Configuration

### Environment Variables (Optional)

If you want to add Google Analytics or other services:

1. In Vercel Dashboard → Project Settings → Environment Variables
2. Add the following variables:
   - `GA_MEASUREMENT_ID`: Your Google Analytics 4 Measurement ID
   - `CONTACT_EMAIL`: Email for form submissions

### Custom Domain (Optional)

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel

## 📊 Performance Optimization

The site is already optimized for Vercel with:

- ✅ Static file caching headers
- ✅ Image optimization ready
- ✅ CDN delivery
- ✅ Gzip compression
- ✅ Security headers

## 🔄 Automatic Deployments

Once connected to GitHub:

- **Production**: Pushes to `master` branch automatically deploy to production
- **Preview**: Pull requests create preview deployments
- **Rollback**: Easy rollback to previous deployments via dashboard

## 📱 Testing Your Deployment

After deployment, test these features:

1. **Responsive Design**: Test on mobile, tablet, desktop
2. **Forms**: Test quote and contact forms
3. **Navigation**: Test smooth scrolling and mobile menu
4. **Calculator**: Test the quote calculator functionality
5. **Performance**: Run Lighthouse audit

## 🛠️ Troubleshooting

### Common Issues

**Issue**: Build fails
- **Solution**: Ensure all files are committed and pushed to GitHub

**Issue**: Images not loading
- **Solution**: Check image paths are relative (e.g., `images/hero.jpg`)

**Issue**: Forms not working
- **Solution**: Forms currently use JavaScript simulation. For production, integrate with:
  - Vercel Forms
  - Netlify Forms
  - Formspree
  - EmailJS

### Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Repository**: [github.com/Qcsinc23/event-Logistics](https://github.com/Qcsinc23/event-Logistics)

## 🎯 Next Steps

1. **Set up form handling** for quote and contact forms
2. **Add Google Analytics** tracking ID
3. **Configure custom domain** if needed
4. **Set up monitoring** and alerts
5. **Add SSL certificate** (automatic with Vercel)

---

**Your website is now live at**: `https://quiet-craft-solutions.vercel.app`

🎉 **Congratulations!** Your event logistics website is now deployed and ready for business.
