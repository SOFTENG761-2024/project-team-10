import React from 'react';
import PropTypes from 'prop-types';

const IconButton = ({ icon, activeIcon, onClick, isActive, className }) => {
  return (
    <button onClick={onClick} className={`icon-button ${className}`}>
      {isActive && activeIcon ? activeIcon : icon}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  activeIcon: PropTypes.element,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

IconButton.defaultProps = {
  activeIcon: null,
  className: '',
};

export default IconButton;
