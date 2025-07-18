import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, PieChart, BarChart3 } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/expense', icon: Plus, label: 'Expense' },
    { path: '/budget', icon: PieChart, label: 'Budget' },
    { path: '/reports', icon: BarChart3, label: 'Reports' }
  ];

  return (
    <nav className="navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={24} />
            <span className="nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;