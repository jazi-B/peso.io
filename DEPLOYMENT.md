# How to Deploy Peso.io

Converting your application from a local development version to a live website requires a few steps. Since your application is built with **Next.js** and uses a **Database**, the best and easiest way to deploy is using **Vercel** combined with a cloud database (like **Vercel Postgres** or **Neon**).

## 🛑 Important: SQLite Limitation
Currently, your app uses **SQLite** (`dev.db`). This uses a local file for the database.
- **Problem**: Cloud hosting platforms (like Vercel) are "serverless." They don't keep local files permanently. If you deploy with SQLite, **your data will be deleted** every time the site updates or sleeps.
- **Solution**: Switch to **PostgreSQL** (a proper cloud database) for the live version. It's free and easy.

---

## Step 1: Prepare for Deployment

1.  **Create a GitHub Repository**:
    - Go to [GitHub.com](https://github.com) and create a new repository (e.g., `peso-app`).
    - Push your code to GitHub:
      ```bash
      git init
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git remote add origin <your-repo-url>
      git push -u origin main
      ```

## Step 2: Set up Vercel & Database

1.  **Go to [Vercel.com](https://vercel.com)** and request an account / log in.
2.  **Add New Project**:
    - Import your `peso-app` repository.
3.  **Storage / Database**:
    - Before clicking "Deploy," look for the **Storage** tab (or create the project and then go to storage).
    - Create a new **Postgres** database.
    - Accept the terms and connect it to your project.
    - Vercel will automatically add environment variables (`POSTGRES_URL`, etc.) to your deployment.

## Step 3: Update Code for Postgres

You need to allow your app to use Postgres in production while keeping SQLite for development (optional, or just switch purely to Postgres).

1.  **Install dependencies**:
    ```bash
    npm install pg @vercel/postgres
    ```

2.  **Update `prisma/schema.prisma`**:
    Change the datasource provider to look like this:
    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("POSTGRES_PRISMA_URL") // Uses Vercel's connection pool
      directUrl = env("POSTGRES_URL_NON_POOLING") // Uses direct connection
    }
    ```
    *(Note: When you do this, you might need to recreate your migration history).*

3.  **Update `.env` locally**:
    - If you want to test Postgres locally, copy the connection strings from Vercel to your local `.env`.

## Step 4: Deploy

1.  **Push your changes** (schema update) to GitHub.
2.  Vercel will detect the push and start building.
3.  **Run Migrations on Production**:
    - In your Vercel project settings, go to **Settings > General > Build & Development Settings**.
    - Change the **Build Command** to:
      ```bash
      npx prisma generate && npx prisma db push && next build
      ```
      *(`prisma db push` is good for prototyping. For strictly production apps, `prisma migrate deploy` is better, but `push` is easier for now).*

4.  **Visit your URL**: Vercel will give you a domain (e.g., `peso-app.vercel.app`).

---

## Alternative: VPS (DigitalOcean / AWS)
If you strictly want to keep **SQLite**, you must rent a **VPS** (dVirtual Private Server).
1.  Rent a server (Ubuntu).
2.  Install Node.js & PM2.
3.  Clone your repo.
4.  Run `npm install`, `npm run build`, and `pm2 start npm --name "peso" -- start`.
5.  Set up Nginx as a reverse proxy.
*This is much more complex than the Vercel method.*
