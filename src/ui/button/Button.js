import React from 'react';

function Button({buttonStyle,buttonName,buttonType}) {
    return (
        <button type={buttonType} className={`btn ${buttonStyle}`}>{buttonName}</button>
    )
}

export default Button;