# Ambigapathi V — Data Analyst & Data Scientist Portfolio

A high-performance personal portfolio and interactive case study platform built with React 19, TypeScript, Tailwind CSS, Recharts, and Motion.

---

## 🚀 Deploying to GitHub Pages

This project is configured and ready for 1-click or automated deployment on **GitHub Pages**.

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

1. **Push your code to GitHub** (or click **Export to GitHub** from AI Studio).
2. On GitHub, navigate to your repository:
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push to `main` (or `master`), or trigger the workflow manually under the **Actions** tab.
4. Your website will be live automatically at `https://<your-username>.github.io/<repo-name>/`!

---

### Method 2: Manual 1-Command Deployment via Terminal (`gh-pages`)

If you have cloned the repository locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the deployment script:
   ```bash
   npm run deploy
   ```

This command will automatically run `npm run build` and push the bundled `dist/` directory to the `gh-pages` branch on GitHub.

3. In your GitHub repository **Settings** > **Pages**:
   - Ensure the Source is set to **Deploy from a branch** and select `gh-pages` branch (`/root`).

---

## 🛠️ Local Development

To run locally on your machine:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 📦 Production Build Verification

To test the production build locally:

```bash
npm run build
npm run preview
```
