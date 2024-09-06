import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={`button ${className}`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    className: '',
    disabled: false,
};

export default Button;
