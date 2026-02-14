# How to Make Peso.io Live 🚀

I have pushed all your code to GitHub. It is ready for Vercel.

## Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com/signup).
2. Sign up with **GitHub**.

## Step 2: Import Project
1. On your Vercel Dashboard, click **"Add New..."** -> **"Project"**.
2. You will see `jazi-B/peso.io` in the list. Click **Import**.

## Step 3: Configure Database (The Magic Part)
1. On the configuration screen, click **Deploy**. (It might fail the first time, don't worry).
2. Once the project is created, go to the **Storage** tab at the top.
3. Click **Connect Store** -> **Postgres** -> **Create New**.
4. Accept the terms, choose a region (e.g., Washington/New York or Europe), and click **Create**.
5. Vercel will automatically add the environment variables (`POSTGRES_PRISMA_URL`, etc.) to your project.

## Step 4: Add Secret Variables
1. Go to **Settings** -> **Environment Variables**.
2. Add these two variables:
   - **Key**: `ADMIN_PASSWORD` | **Value**: `admin123` (or your chosen password)
   - **Key**: `JWT_SECRET` | **Value**: `complex_secret_key_here`

## Step 5: Redeploy
1. Go to the **Deployments** tab.
2. Click the three dots on the failed/latest deployment -> **Redeploy**.
3. It should now build successfully!

## Step 6: Initialize Database
1. Once the site is live, the database is empty.
2. You might need to run the specific command to push the schema. Vercel usually handles this if `postinstall` is set, but if not:
   - Go to your Vercel Project -> **Settings** -> **General**.
   - In "Build & Development Settings", change **Build Command** to: `npx prisma db push && next build`.
   - Redeploy one last time.

🎉 Your site is live!
