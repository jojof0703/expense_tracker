import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, DollarSign } from 'lucide-react';

const IncomeForm = ({ onAddIncome }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    type: 'tip',
    note: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount) {
      alert('Please enter an amount');
      return;
    }

    const income = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString(),
      type: 'income'
    };

    onAddIncome(income);
    navigate('/');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="income-form">
      <header className="form-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={24} />
        </button>
        <h1>Add Income</h1>
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

        {/* Income Type Field */}
        <div className="form-group">
          <label htmlFor="type">Income Type</label>
          <div className="type-buttons">
            <button
              type="button"
              className={`type-button ${formData.type === 'tip' ? 'selected' : ''}`}
              onClick={() => handleInputChange('type', 'tip')}
            >
              <DollarSign size={20} />
              <span>Tip</span>
            </button>
            <button
              type="button"
              className={`type-button ${formData.type === 'paycheck' ? 'selected' : ''}`}
              onClick={() => handleInputChange('type', 'paycheck')}
            >
              <DollarSign size={20} />
              <span>Paycheck</span>
            </button>
          </div>
        </div>

        {/* Note Field */}
        <div className="form-group">
          <label htmlFor="note">Note (optional)</label>
          <textarea
            id="note"
            value={formData.note}
            onChange={(e) => handleInputChange('note', e.target.value)}
            placeholder="e.g., Friday night tips, biweekly paycheck"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          <Save size={20} />
          Save Income
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;