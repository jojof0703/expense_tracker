# Expense Tracker

A React-based expense tracking application that helps you manage your finances.

## Features

- Track expenses and income
- Set budget categories
- View detailed reports and analytics
- Responsive design
- Local storage for data persistence

## Development

To run the application locally:

```bash
npm install
npm run dev
```

## Deployment to GitHub Pages

This application is configured to deploy to GitHub Pages at: https://jojo0703.github.io/expense_tracker/

### Automatic Deployment

The app uses GitHub Actions to automatically deploy when you push to the main branch. The workflow is configured in `.github/workflows/deploy.yml`.

### Manual Deployment

If you prefer to deploy manually:

1. Install the gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Build and deploy:
   ```bash
   npm run deploy
   ```

### GitHub Pages Setup

Make sure your repository has GitHub Pages enabled:

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Set the source to "Deploy from a branch"
4. Select the "gh-pages" branch
5. Save the settings

## Configuration

The app is configured for GitHub Pages with:
- Base path: `/expense_tracker/`
- HashRouter for better compatibility with GitHub Pages
- Automatic deployment via GitHub Actions

## Technologies Used

- React 19
- Vite
- React Router DOM
- Recharts for data visualization
- Lucide React for icons
- Date-fns for date manipulation
