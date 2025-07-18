import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from 'date-fns';

const Reports = ({ expenses, income, budgetCategories }) => {
  const [timeframe, setTimeframe] = useState('week');

  // Get date range based on timeframe
  const getDateRange = () => {
    const now = new Date();
    switch (timeframe) {
      case 'week':
        return {
          start: startOfWeek(now, { weekStartsOn: 1 }),
          end: endOfWeek(now, { weekStartsOn: 1 })
        };
      case 'month':
        return {
          start: startOfMonth(now),
          end: endOfMonth(now)
        };
      default:
        return {
          start: startOfWeek(now, { weekStartsOn: 1 }),
          end: endOfWeek(now, { weekStartsOn: 1 })
        };
    }
  };

  const { start, end } = getDateRange();

  // Filter data by timeframe
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= start && expenseDate <= end;
  });

  const filteredIncome = income.filter(incomeEntry => {
    const incomeDate = new Date(incomeEntry.date);
    return incomeDate >= start && incomeDate <= end;
  });

  // Calculate totals
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const totalIncome = filteredIncome.reduce((sum, incomeEntry) => sum + parseFloat(incomeEntry.amount), 0);
  const netAmount = totalIncome - totalExpenses;

  // Prepare data for category breakdown chart
  const categoryData = budgetCategories.map(category => {
    const categoryExpenses = filteredExpenses.filter(expense => expense.category === category.name);
    const total = categoryExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    
    return {
      name: category.name,
      value: total,
      color: category.color
    };
  }).filter(item => item.value > 0);

  // Prepare data for daily spending chart
  const getDailyData = () => {
    const dailyData = [];
    const current = new Date(start);
    
    while (current <= end) {
      const dayExpenses = filteredExpenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return format(expenseDate, 'yyyy-MM-dd') === format(current, 'yyyy-MM-dd');
      });
      
      const dayIncome = filteredIncome.filter(incomeEntry => {
        const incomeDate = new Date(incomeEntry.date);
        return format(incomeDate, 'yyyy-MM-dd') === format(current, 'yyyy-MM-dd');
      });

      dailyData.push({
        date: format(current, 'MMM d'),
        expenses: dayExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0),
        income: dayIncome.reduce((sum, incomeEntry) => sum + parseFloat(incomeEntry.amount), 0)
      });

      current.setDate(current.getDate() + 1);
    }

    return dailyData;
  };

  const dailyData = getDailyData();

  return (
    <div className="reports">
      <header className="reports-header">
        <h1>Reports & Analytics</h1>
        <div className="timeframe-selector">
          <button
            className={`timeframe-button ${timeframe === 'week' ? 'active' : ''}`}
            onClick={() => setTimeframe('week')}
          >
            This Week
          </button>
          <button
            className={`timeframe-button ${timeframe === 'month' ? 'active' : ''}`}
            onClick={() => setTimeframe('month')}
          >
            This Month
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card income">
          <div className="card-icon">
            <TrendingUp size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Total Income</span>
            <span className="card-amount">${totalIncome.toFixed(2)}</span>
          </div>
        </div>
        <div className="summary-card expenses">
          <div className="card-icon">
            <TrendingDown size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Total Expenses</span>
            <span className="card-amount">${totalExpenses.toFixed(2)}</span>
          </div>
        </div>
        <div className={`summary-card net ${netAmount >= 0 ? 'positive' : 'negative'}`}>
          <div className="card-icon">
            {netAmount >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          </div>
          <div className="card-content">
            <span className="card-label">Net Amount</span>
            <span className="card-amount">${netAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Daily Spending Chart */}
      <div className="chart-section">
        <h2>Daily Income vs Expenses</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Bar dataKey="income" fill="#4CAF50" name="Income" />
              <Bar dataKey="expenses" fill="#f44336" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      {categoryData.length > 0 && (
        <div className="chart-section">
          <h2>Spending by Category</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Category List */}
      <div className="category-breakdown">
        <h2>Category Breakdown</h2>
        <div className="category-list">
          {categoryData.map(category => (
            <div key={category.name} className="category-item">
              <div className="category-info">
                <div 
                  className="category-color" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="category-name">{category.name}</span>
              </div>
              <div className="category-amounts">
                <span className="category-total">${category.value.toFixed(2)}</span>
                <span className="category-percentage">
                  {((category.value / totalExpenses) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;