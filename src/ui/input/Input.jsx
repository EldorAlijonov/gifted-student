import React, { useState } from 'react';

function Input(props) {
    const { id, label, inputType, iconClass, onChange, ...inputProps } = props;
    return (
        <div className="mb-3">
            <label className="form-label fw-bold">{label}</label>
            <div className="form-input-div text-secondary d-flex align-items-center ps-3 py-2 rounded">
                <i className={`bi ${iconClass}`}></i>
                <input
                    placeholder={label}
                    type={inputType}
                    {...inputProps}
                    className="form-control-style w-100"
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default Input;