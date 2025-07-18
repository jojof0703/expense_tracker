# 💰 Personal Spending Tracker

A mobile-first web application to help you build better spending habits and manage your money more intentionally. Perfect for people with variable income like servers, gig workers, and freelancers.

## 🎯 Features

### 💸 Quick Expense Logging
- Add expenses in under 5 seconds
- Track amount, category, vendor, notes, and feelings
- Emotion-driven logging (😄/😐/😞)

### 📥 Income Logging
- Log daily tips and paychecks
- Automatic percentage-based budget distribution
- Support for variable income patterns

### 🧮 Percentage-Based Budgeting
- Set budget categories with percentage allocations
- Automatic money distribution when income is added
- Real-time tracking of allocated, spent, and remaining amounts
- Visual progress bars with color coding

### 📊 Analytics & Reports
- Daily summaries of earnings and spending
- Weekly and monthly breakdowns by category
- Interactive charts and visualizations
- Streak tracking for consistent logging

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spending-tracker.git
cd spending-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Mobile-First Design

The app is designed with mobile users in mind:
- Responsive design that works on all screen sizes
- Touch-friendly interface with large buttons
- Bottom navigation for easy thumb access
- Optimized for quick data entry

## 🛠️ Tech Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Styling**: CSS3 with mobile-first approach
- **Storage**: Local Storage (offline-first)

## 🚀 Deployment to GitHub Pages

### Automatic Deployment

1. Update the `homepage` field in `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/spending-tracker"
}
```

2. Create a GitHub repository and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/spending-tracker.git
git push -u origin main
```

3. Go to your repository settings on GitHub:
   - Navigate to "Settings" → "Pages"
   - Set source to "GitHub Actions"
   - Create a new workflow file

4. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

5. Your app will be available at `https://yourusername.github.io/spending-tracker`

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your web server or hosting service.

## 📊 Data Storage

The app uses browser localStorage to store your data locally. This means:
- ✅ Your data stays private on your device
- ✅ Works offline
- ✅ No account creation required
- ⚠️ Data is not synced across devices
- ⚠️ Data can be lost if you clear browser data

## 🎨 Customization

### Budget Categories
You can customize the default budget categories in `src/App.jsx`:

```javascript
const [budgetCategories, setBudgetCategories] = useState([
  { id: 1, name: 'Food & Dining', percentage: 25, color: '#FF6B6B' },
  { id: 2, name: 'Transportation', percentage: 15, color: '#4ECDC4' },
  // Add your own categories here
]);
```

### Colors and Styling
The app uses a clean, modern design with CSS custom properties. You can customize colors and styling in `src/App.css`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and Vite for fast development
- Icons from Lucide React
- Charts powered by Recharts
- Date utilities from date-fns

---

**Happy Budgeting! 💰✨**
