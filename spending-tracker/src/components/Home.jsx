import { Link } from 'react-router-dom';
import { Plus, TrendingUp, TrendingDown, Target, Database } from 'lucide-react';
import { format, startOfDay, endOfDay } from 'date-fns';
import { loadDemoData, clearAllData } from '../demo-data';

const Home = ({ expenses, income, budgetCategories }) => {
  const today = new Date();
  const todayStart = startOfDay(today);
  const todayEnd = endOfDay(today);

  // Calculate today's totals
  const todayExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= todayStart && expenseDate <= todayEnd;
  });

  const todayIncome = income.filter(incomeEntry => {
    const incomeDate = new Date(incomeEntry.date);
    return incomeDate >= todayStart && incomeDate <= todayEnd;
  });

  const totalSpentToday = todayExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const totalEarnedToday = todayIncome.reduce((sum, incomeEntry) => sum + parseFloat(incomeEntry.amount), 0);

  // Calculate streak (consecutive days with logged expenses)
  const getStreak = () => {
    const dates = [...new Set(expenses.map(expense => format(new Date(expense.date), 'yyyy-MM-dd')))].sort();
    let streak = 0;
    let currentDate = new Date();
    
    for (let i = dates.length - 1; i >= 0; i--) {
      const expenseDate = new Date(dates[i]);
      const diffDays = Math.floor((currentDate - expenseDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const streak = getStreak();

  return (
    <div className="home">
      <header className="home-header">
        <h1>💰 Spending Tracker</h1>
        <p className="subtitle">Track your money, build better habits</p>
      </header>

      {/* Quick Add Buttons */}
      <div className="quick-actions">
        <Link to="/expense" className="quick-action expense">
          <Plus size={24} />
          <span>Add Expense</span>
        </Link>
        <Link to="/income" className="quick-action income">
          <TrendingUp size={24} />
          <span>Add Income</span>
        </Link>
      </div>

      {/* Daily Summary */}
      <div className="daily-summary">
        <h2>Today's Summary</h2>
        <div className="summary-cards">
          <div className="summary-card earned">
            <div className="card-icon">
              <TrendingUp size={20} />
            </div>
            <div className="card-content">
              <span className="card-label">Earned</span>
              <span className="card-amount">${totalEarnedToday.toFixed(2)}</span>
            </div>
          </div>
          <div className="summary-card spent">
            <div className="card-icon">
              <TrendingDown size={20} />
            </div>
            <div className="card-content">
              <span className="card-label">Spent</span>
              <span className="card-amount">${totalSpentToday.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Streak Tracker */}
      {streak > 0 && (
        <div className="streak-tracker">
          <div className="streak-content">
            <Target size={20} />
            <span>Logged expenses {streak} day{streak > 1 ? 's' : ''} in a row!</span>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {[...expenses, ...income]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((item) => (
              <div key={item.id} className="activity-item">
                <div className="activity-icon">
                  {item.amount ? (
                    <TrendingDown size={16} className="expense-icon" />
                  ) : (
                    <TrendingUp size={16} className="income-icon" />
                  )}
                </div>
                <div className="activity-details">
                  <span className="activity-title">
                    {item.category || item.type || 'Transaction'}
                  </span>
                  <span className="activity-date">
                    {format(new Date(item.date), 'MMM d, h:mm a')}
                  </span>
                </div>
                <span className={`activity-amount ${item.amount ? 'expense' : 'income'}`}>
                  {item.amount ? '-' : '+'}${Math.abs(parseFloat(item.amount || item.amount)).toFixed(2)}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Demo Data Controls (only show if no data exists) */}
      {expenses.length === 0 && income.length === 0 && (
        <div className="demo-controls">
          <h2>Get Started</h2>
          <div className="demo-buttons">
            <button onClick={loadDemoData} className="demo-button load">
              <Database size={20} />
              Load Demo Data
            </button>
            <button onClick={clearAllData} className="demo-button clear">
              <Database size={20} />
              Clear All Data
            </button>
          </div>
          <p className="demo-note">
            Load demo data to see how the app works with sample expenses and income.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;