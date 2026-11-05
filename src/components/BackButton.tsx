import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export interface BackButtonProps {
  label?: string;
  to?: string;
  fallbackTo?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label = 'Back',
  to,
  fallbackTo,
  className = '',
  onClick,
  disabled = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
      return;
    }
    if (to) {
      navigate(to);
      return;
    }
    // Check if there is meaningful history
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else if (fallbackTo) {
      navigate(fallbackTo);
    } else {
      // Sensible contextual fallbacks for direct page visits / refresh
      const path = location.pathname;
      if (path.startsWith('/service/')) {
        navigate('/explore');
      } else if (path.startsWith('/book/')) {
        navigate(-1);
      } else if (path.startsWith('/checkout')) {
        navigate('/bookings');
      } else if (path.startsWith('/confirmation')) {
        navigate('/bookings');
      } else if (path.startsWith('/category/') || path === '/categories') {
        navigate('/');
      } else if (path === '/explore') {
        navigate('/');
      } else if (path === '/profile' || path === '/settings') {
        navigate('/dashboard');
      } else if (path === '/signin' || path === '/signup') {
        navigate('/');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleBack}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className={`btn-back ${className}`.trim()}
      title={label || 'Back'}
      aria-label={label || 'Back'}
    >
      <ArrowLeft size={16} className="btn-back-icon" />
      <span>{label}</span>
    </motion.button>
  );
};

export default BackButton;
