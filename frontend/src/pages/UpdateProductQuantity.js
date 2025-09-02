import axios from 'axios';
import React, { useState } from 'react';
import { InputNumber, Button } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";


const UpdateProductQuantity = ({ uid, type }) => {
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();


    const handleQuantityUpdate = async () => {
        try {
            let response;
            if (type === 'add') {
                response = await axios.put(`http://localhost:4000/api/transfer/${uid}/quantity`, { quantity });
                console.log("Added quantity:", response.data);
                if (response) {
                    navigate('/admin/items-in')
                }
            } else if (type === 'remove') {
                response = await axios.put(`http://localhost:4000/api/transfer/${uid}/quantityy`, { quantity });
                console.log("Removed quantity:", response.data);
                if (response) {
                    navigate('/admin/items-out')
                }
            }
            setQuantity(0);
        } catch (error) {
            console.error(`Error ${type === 'add' ? 'adding' : 'removing'} quantity:, error`);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '16px' }}>
                <label>Quantity</label>
                <InputNumber value={quantity} onChange={(value) => setQuantity(value)} style={{ width: '100%' }} />
            </div>
            {type === 'add' ? (
                <Button
                type="primary"
                onClick={handleQuantityUpdate}
                style={{ marginRight: '20px', backgroundColor: 'blue', borderColor: 'black' }}
            >
                ADD 
            </Button>
            ) : (
            <Button
                type="primary"
                onClick={handleQuantityUpdate}
                style={{ backgroundColor: 'blue', borderColor: 'black'}}
            >
                REMOVE  
            </Button>
            
            )}
        </div>
    );
};

export default UpdateProductQuantity;