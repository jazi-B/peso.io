import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: readonly string[];
    error?: string;
    placeholder?: string;
}

export const Select = ({ label, options, error, placeholder = "Select an option", ...props }: SelectProps) => {
    return (
        <div className="input-group">
            <label className="label" htmlFor={props.id}>
                {label}
                {props.required && <span style={{ color: 'var(--danger)', marginLeft: '4px' }}>*</span>}
            </label>
            <div style={{ position: 'relative' }}>
                <select
                    className="input"
                    style={{ appearance: 'none', cursor: 'pointer', ...(error ? { borderColor: 'var(--danger)' } : {}) }}
                    {...props}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                <div style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: 'var(--text-muted)'
                }}>
                    ▼
                </div>
            </div>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};
