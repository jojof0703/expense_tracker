import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';
import Budget from './components/Budget';
import Reports from './components/Reports';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [budgetCategories, setBudgetCategories] = useState([
    { id: 1, name: 'Food & Dining', percentage: 25, color: '#FF6B6B' },
    { id: 2, name: 'Transportation', percentage: 15, color: '#4ECDC4' },
    { id: 3, name: 'Entertainment', percentage: 10, color: '#45B7D1' },
    { id: 4, name: 'Shopping', percentage: 20, color: '#96CEB4' },
    { id: 5, name: 'Bills & Utilities', percentage: 20, color: '#FFEAA7' },
    { id: 6, name: 'Savings', percentage: 10, color: '#DDA0DD' }
  ]);

  // Load data from localStorage on app start
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedIncome = localStorage.getItem('income');
    const savedBudget = localStorage.getItem('budgetCategories');

    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedIncome) setIncome(JSON.parse(savedIncome));
    if (savedBudget) setBudgetCategories(JSON.parse(savedBudget));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('income', JSON.stringify(income));
  }, [income]);

  useEffect(() => {
    localStorage.setItem('budgetCategories', JSON.stringify(budgetCategories));
  }, [budgetCategories]);

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now() }]);
  };

  const addIncome = (incomeEntry) => {
    setIncome(prev => [...prev, { ...incomeEntry, id: Date.now() }]);
  };

  const updateBudgetCategories = (categories) => {
    setBudgetCategories(categories);
  };

  return (
    <Router>
      <div className="app">
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home expenses={expenses} income={income} budgetCategories={budgetCategories} />} />
            <Route path="/expense" element={<ExpenseForm onAddExpense={addExpense} budgetCategories={budgetCategories} />} />
            <Route path="/income" element={<IncomeForm onAddIncome={addIncome} />} />
            <Route path="/budget" element={<Budget budgetCategories={budgetCategories} expenses={expenses} income={income} onUpdateBudget={updateBudgetCategories} />} />
            <Route path="/reports" element={<Reports expenses={expenses} income={income} budgetCategories={budgetCategories} />} />
          </Routes>
        </div>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
