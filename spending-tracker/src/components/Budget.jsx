import { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';

const Budget = ({ budgetCategories, expenses, income, onUpdateBudget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategories, setEditingCategories] = useState([...budgetCategories]);

  // Calculate total income
  const totalIncome = income.reduce((sum, incomeEntry) => sum + parseFloat(incomeEntry.amount), 0);

  // Calculate spent amounts per category
  const getCategorySpent = (categoryName) => {
    return expenses
      .filter(expense => expense.category === categoryName)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  };

  // Calculate allocated amounts per category
  const getCategoryAllocated = (category) => {
    return (totalIncome * category.percentage) / 100;
  };

  const handleSaveBudget = () => {
    // Validate that percentages add up to 100%
    const totalPercentage = editingCategories.reduce((sum, cat) => sum + cat.percentage, 0);
    
    if (Math.abs(totalPercentage - 100) > 0.01) {
      alert('Total percentage must equal 100%');
      return;
    }

    onUpdateBudget(editingCategories);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditingCategories([...budgetCategories]);
    setIsEditing(false);
  };

  const updateCategoryPercentage = (categoryId, newPercentage) => {
    setEditingCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, percentage: parseFloat(newPercentage) || 0 }
          : cat
      )
    );
  };

  const updateCategoryName = (categoryId, newName) => {
    setEditingCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, name: newName }
          : cat
      )
    );
  };

  return (
    <div className="budget">
      <header className="budget-header">
        <h1>Budget Overview</h1>
        <div className="budget-actions">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="edit-button">
              <Edit3 size={20} />
              Edit Budget %
            </button>
          ) : (
            <div className="edit-actions">
              <button onClick={handleSaveBudget} className="save-button">
                <Save size={20} />
                Save
              </button>
              <button onClick={handleCancelEdit} className="cancel-button">
                <X size={20} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Total Income Display */}
      <div className="total-income">
        <h2>Total Income: ${totalIncome.toFixed(2)}</h2>
      </div>

      {/* Budget Categories */}
      <div className="budget-categories">
        {(isEditing ? editingCategories : budgetCategories).map(category => {
          const allocated = getCategoryAllocated(category);
          const spent = getCategorySpent(category.name);
          const remaining = allocated - spent;
          const percentageUsed = allocated > 0 ? (spent / allocated) * 100 : 0;

          return (
            <div key={category.id} className="budget-category">
              <div className="category-header">
                {isEditing ? (
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => updateCategoryName(category.id, e.target.value)}
                    className="category-name-input"
                  />
                ) : (
                  <h3>{category.name}</h3>
                )}
                <div className="category-percentage">
                  {isEditing ? (
                    <input
                      type="number"
                      value={category.percentage}
                      onChange={(e) => updateCategoryPercentage(category.id, e.target.value)}
                      className="percentage-input"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  ) : (
                    <span>{category.percentage}%</span>
                  )}
                </div>
              </div>

              <div className="category-amounts">
                <div className="amount-row">
                  <span className="amount-label">Allocated:</span>
                  <span className="amount-value">${allocated.toFixed(2)}</span>
                </div>
                <div className="amount-row">
                  <span className="amount-label">Spent:</span>
                  <span className="amount-value">${spent.toFixed(2)}</span>
                </div>
                <div className="amount-row">
                  <span className="amount-label">Remaining:</span>
                  <span className={`amount-value ${remaining < 0 ? 'over-budget' : ''}`}>
                    ${remaining.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-container">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: `${Math.min(percentageUsed, 100)}%`,
                    backgroundColor: percentageUsed > 100 ? '#ff4444' : category.color
                  }}
                />
                <span className="progress-text">{percentageUsed.toFixed(1)}% used</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Percentage Display (when editing) */}
      {isEditing && (
        <div className="total-percentage">
          <span>Total: {editingCategories.reduce((sum, cat) => sum + cat.percentage, 0).toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
};

export default Budget;