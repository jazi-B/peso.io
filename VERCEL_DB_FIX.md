# 🚨 Fix "filter is not a function" (Admin Dashboard Crash)

The error "filter is not a function" happens because the API is returning an **Error Object** (like `{ error: "Query failed" }`) instead of an **Array** (like `[]`). This confuses the frontend code which expects a list.

This is happening because your **Database is Empty/Uninitialized** on Vercel.

## ✅ Solution: Push the Schema to Vercel

1. **Go to Vercel Dashboard** -> Your Project (`peso.io`).
2. Click **Settings** (top right).
3. Scroll down to **"Build & Development Settings"**.
4. In the **"Build Command"** box, CHANGE it to:
   `npx prisma db push && next build`
5. Click **Save**.

## 🚀 Redeploy to Apply Fix
1. Go to the **Deployments** tab.
2. Click the three dots on the latest deployment -> **Redeploy**.
3. Wait for it to finish.

This will force Vercel to create the "Orders" and "ContactQuery" tables in your database. Once done, the Admin Dashboard will stop crashing!
