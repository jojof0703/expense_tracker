import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

const ExpenseForm = ({ onAddExpense, budgetCategories }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    vendor: '',
    note: '',
    feeling: '😐'
  });

  const feelings = ['😄', '😐', '😞'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category) {
      alert('Please fill in amount and category');
      return;
    }

    const expense = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString(),
      type: 'expense'
    };

    onAddExpense(expense);
    navigate('/');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="expense-form">
      <header className="form-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={24} />
        </button>
        <h1>Add Expense</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        {/* Amount Field */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <div className="amount-input">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        {/* Category Field */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {budgetCategories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Vendor Field */}
        <div className="form-group">
          <label htmlFor="vendor">Vendor (optional)</label>
          <input
            type="text"
            id="vendor"
            value={formData.vendor}
            onChange={(e) => handleInputChange('vendor', e.target.value)}
            placeholder="e.g., Starbucks, Uber"
          />
        </div>

        {/* Note Field */}
        <div className="form-group">
          <label htmlFor="note">Note (optional)</label>
          <textarea
            id="note"
            value={formData.note}
            onChange={(e) => handleInputChange('note', e.target.value)}
            placeholder="What was this for?"
            rows="3"
          />
        </div>

        {/* Feeling Field */}
        <div className="form-group">
          <label>How do you feel about this expense?</label>
          <div className="feeling-buttons">
            {feelings.map(feeling => (
              <button
                key={feeling}
                type="button"
                className={`feeling-button ${formData.feeling === feeling ? 'selected' : ''}`}
                onClick={() => handleInputChange('feeling', feeling)}
              >
                <span className="feeling-emoji">{feeling}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          <Save size={20} />
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;