# 🚀 Deployment Guide (Vercel + Postgres)

Your code is now configured for **Vercel Postgres**. Follow these steps to go live!

## Step 1: Push to GitHub
1.  Log in to [GitHub.com](https://github.com) and create a **New Repository** named `peso`.
2.  Open your terminal (in this folder) and run these commands one by one:
    ```bash
    git init
    git add .
    git commit -m "Ready for deployment"
    git branch -M main
    # Replace URL below with YOUR repository URL from GitHub
    git remote add origin https://github.com/YOUR_USERNAME/peso.git  
    git push -u origin main
    ```

## Step 2: Deploy on Vercel
1.  Go to [Vercel.com](https://vercel.com) and sign up with GitHub.
2.  Click **"Add New..."** -> **"Project"**.
3.  For "Import Git Repository", you should see your `peso` repo. Click **Import**.
4.  **Important**: Before clicking Deploy:
    *   Look for the **Storage** section (usually on the left sidebar or in the configuration step).
    *   Click **Add** -> **Postgres** (Vercel Postgres).
    *   Accept the terms and click **Connect**.
    *   Vercel will usually say "Linked to project" and automatically add environment variables.

5.  Click **Deploy**.

## Step 3: Initialize the Database
Once the site is deployed, the database is empty. You need to create the tables.
1.  In your Vercel Project dashboard, go to the **Storage** tab -> **Postgres**.
2.  Click **"Query"** or **"Data"** (or look for a way to interact). 
    *   *Actually, the easier way is via your local machine connected to the cloud.*

### Easier method to sync database:
After connecting the database in Vercel, Vercel gives you environment variables.
1. Download/Install **Vercel CLI**: `npm i -g vercel`
2. Run `vercel link` in your terminal to connect your local folder to the Vercel project.
3. Run `vercel env pull .env.development.local` to get the database keys.
4. Run `npx prisma db push` to push your schema to the cloud.

Your site is now live!
