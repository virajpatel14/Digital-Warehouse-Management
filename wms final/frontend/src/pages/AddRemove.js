import React, { useState, useEffect, useRef } from 'react';
import { Input, InputNumber, Button, Row, Col, Card, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import UpdateProductQuantity from './UpdateProductQuantity';
import { useLocation, useNavigate } from "react-router-dom";
import { getCategory } from "../features/category/categorySlice";


const { TextArea } = Input;

const AddRemove = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [productDetails1, setProductDetails1] = useState(null);
  const [productDetails2, setProductDetails2] = useState(null);


  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const categoryState = useSelector((state) => state.category.category);

  const productIdRef1 = useRef(null);
  const productIdRef2 = useRef(null);

  const handleFormSubmit1 = () => {
    if (productDetails1) {
      console.log('Form 1 Values:', {
        name: productDetails1.name,
        description: productDetails1.description,
        category: categoryState.find((category) => category._id === productDetails1.collectionId)?.name || '',
        price: productDetails1.price,
        quantity: productDetails1.quantity,
      });


    }
  };

  const handleFormSubmit2 = () => {
    if (productDetails2) {
      console.log('Form 2 Values:', {
        name: productDetails2.name,
        description: productDetails2.description,
        category: categoryState.find((category) => category._id === productDetails2.collectionId)?.name || '',
        price: productDetails2.price,
        quantity: productDetails1.quantity,
      });


    }
  };

  const fetchProductDetails = async (value, formNumber) => {
    try {

      const response = await axios.get(`http://localhost:4000/api/transfer/okk/${value}`);
      if (formNumber === 1) {
        console.log(response)

        setProductDetails1(response.data.inventoryData);
      } else if (formNumber === 2) {
        setProductDetails2(response.data.inventoryData);
      }
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      message.error('Failed to fetch product details!');
    }
  };

  const handleProductIdChange1 = async (e) => {
    const productId = e.target.value;
    if (productId) {
      await fetchProductDetails(productId, 1);
    }
  };

  const handleProductIdChange2 = async (e) => {
    const productId = e.target.value;
    if (productId) {
      await fetchProductDetails(productId, 2);
    }
  };

  const handleMouseEnter1 = () => {
    productIdRef1.current.focus();
  };

  const handleMouseEnter2 = () => {
    productIdRef2.current.focus();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title={<div style={{ textAlign: 'center', fontWeight: 'bold' }}>ADD ITEM</div>}
            bordered={false}
            onMouseEnter={handleMouseEnter1}
          >
            <div style={{ marginBottom: '16px' }}>
              <label>Product ID</label>
              <Input
                ref={productIdRef1}
                onChange={handleProductIdChange1}
              />
            </div>
            {productDetails1 && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label>Name</label>
                  <Input value={productDetails1.name} disabled />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Description</label>
                  <TextArea value={productDetails1.description} disabled />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Category</label>
                  <Input value={categoryState.find((category) => category._id === productDetails1.collectionId)?.name || ''} disabled />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Price</label>
                  <InputNumber value={productDetails1.price} style={{ width: '100%' }} disabled />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Quantity</label>
                  <InputNumber value={productDetails1.quantity} style={{ width: '100%' }} disabled />
                </div>
                <UpdateProductQuantity uid={productDetails1.productId} type="add" />
              </>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={<div style={{ textAlign: 'center', fontWeight: 'bold' }}>REMOVE ITEM</div>}
            bordered={false}
            onMouseEnter={handleMouseEnter2}
          >
            <div style={{ marginBottom: '16px' }}>
              <label>Product ID</label>
              <Input
                ref={productIdRef2}
                onChange={handleProductIdChange2}
              />
            </div>
            {productDetails2 && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label>Name</label>
                  <Input value={productDetails2.name} disabled />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Description</label>
                  <TextArea value={productDetails2.description} disabled />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Category</label>
                  <Input value={categoryState.find((category) => category._id === productDetails2.collectionId)?.name || ''} disabled />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Price</label>
                  <InputNumber value={productDetails2.price} style={{ width: '100%' }} disabled />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Quantity</label>
                  <InputNumber value={productDetails2.quantity} style={{ width: '100%' }} disabled />
                </div>
                <UpdateProductQuantity uid={productDetails2.productId} type="remove" />
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddRemove;