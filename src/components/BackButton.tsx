import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export interface BackButtonProps {
  label?: string;
  to?: string;
  className?: string;
  variant?: 'default' | 'hero';
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label = 'Back',
  to,
  className = '',
  variant = 'default',
  onClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (to) {
      navigate(to);
      return;
    }
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // Sensible default fallback if user opened link directly in new tab
      if (location.pathname.startsWith('/book/')) {
        navigate('/explore');
      } else if (location.pathname.startsWith('/checkout')) {
        navigate(-1);
      } else if (location.pathname.startsWith('/confirmation')) {
        navigate('/bookings');
      } else if (location.pathname.startsWith('/service/')) {
        navigate('/explore');
      } else {
        navigate('/');
      }
    }
  };

  const variantClass = variant === 'hero' ? 'btn-back-hero' : '';

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`btn-back ${variantClass} ${className}`.trim()}
      title={label ? `${label}` : 'Go back to previous page'}
      aria-label={label || 'Go back to previous page'}
    >
      <ArrowLeft size={16} className="btn-back-icon" />
      {label && <span>{label}</span>}
    </button>
  );
};

export default BackButton;
