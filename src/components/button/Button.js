import React from "react";
import './Button.css';

 const Button = ({ primary, backgroundColor, size, label, ...props }) => {
    const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
    return (
      <button
        type="submit"
        className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
        style={backgroundColor && { backgroundColor }}
        {...props}
      >
        {label}
      </button>
    );
  };

  export default Button;