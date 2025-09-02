import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const CustomInput = (props) => {
    const { type, label, i_id, i_class, name, val, onChng, onBlr, showPassword, onTogglePassword } = props;
    return (
        <div className="form-floating mt-3" style={{ position: 'relative' }}>
            <input
                type={type}
                className={`form-control ${i_class}`}
                id={i_id}
                placeholder={label}
                name={name}
                value={val}
                onChange={onChng}
                onBlur={onBlr}
            />
            <label htmlFor={i_id}>{label}</label>
            {name === 'password' && (
                <button 
                    type="button" 
                    onClick={onTogglePassword} 
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#007bff'
                    }}
                >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
            )}
        </div>
    );
};

export default CustomInput;
