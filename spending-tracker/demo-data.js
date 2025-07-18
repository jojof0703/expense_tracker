// Demo data for Spending Tracker
// You can use this to test the app with sample data

export const demoExpenses = [
  {
    id: 1,
    amount: 12.50,
    category: 'Food & Dining',
    vendor: 'Starbucks',
    note: 'Morning coffee',
    feeling: '😄',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'expense'
  },
  {
    id: 2,
    amount: 25.00,
    category: 'Food & Dining',
    vendor: 'Chipotle',
    note: 'Lunch',
    feeling: '😐',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'expense'
  },
  {
    id: 3,
    amount: 45.00,
    category: 'Transportation',
    vendor: 'Uber',
    note: 'Ride to work',
    feeling: '😐',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'expense'
  },
  {
    id: 4,
    amount: 15.00,
    category: 'Entertainment',
    vendor: 'Netflix',
    note: 'Monthly subscription',
    feeling: '😄',
    date: new Date(Date.now()).toISOString(),
    type: 'expense'
  },
  {
    id: 5,
    amount: 80.00,
    category: 'Shopping',
    vendor: 'Target',
    note: 'Household items',
    feeling: '😐',
    date: new Date(Date.now()).toISOString(),
    type: 'expense'
  }
];

export const demoIncome = [
  {
    id: 1,
    amount: 150.00,
    type: 'tip',
    note: 'Friday night tips',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    incomeType: 'tip'
  },
  {
    id: 2,
    amount: 1200.00,
    type: 'paycheck',
    note: 'Biweekly paycheck',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    incomeType: 'paycheck'
  },
  {
    id: 3,
    amount: 85.00,
    type: 'tip',
    note: 'Saturday tips',
    date: new Date(Date.now()).toISOString(),
    incomeType: 'tip'
  }
];

export const demoBudgetCategories = [
  { id: 1, name: 'Food & Dining', percentage: 25, color: '#FF6B6B' },
  { id: 2, name: 'Transportation', percentage: 15, color: '#4ECDC4' },
  { id: 3, name: 'Entertainment', percentage: 10, color: '#45B7D1' },
  { id: 4, name: 'Shopping', percentage: 20, color: '#96CEB4' },
  { id: 5, name: 'Bills & Utilities', percentage: 20, color: '#FFEAA7' },
  { id: 6, name: 'Savings', percentage: 10, color: '#DDA0DD' }
];

// Function to load demo data
export const loadDemoData = () => {
  localStorage.setItem('expenses', JSON.stringify(demoExpenses));
  localStorage.setItem('income', JSON.stringify(demoIncome));
  localStorage.setItem('budgetCategories', JSON.stringify(demoBudgetCategories));
  
  // Reload the page to see the demo data
  window.location.reload();
};

// Function to clear all data
export const clearAllData = () => {
  localStorage.removeItem('expenses');
  localStorage.removeItem('income');
  localStorage.removeItem('budgetCategories');
  
  // Reload the page
  window.location.reload();
};