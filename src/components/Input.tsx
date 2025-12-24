import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
    return (
        <div className="input-group">
            <label className="label" htmlFor={props.id}>
                {label}
                {props.required && <span style={{ color: 'var(--danger)', marginLeft: '4px' }}>*</span>}
            </label>
            <input
                className={`input ${error ? 'border-red-500' : ''} ${className || ''}`}
                style={error ? { borderColor: 'var(--danger)' } : {}}
                {...props}
            />
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};
