import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, message } from 'antd';

const RemovedProducts = () => {
  const [removedProducts, setRemovedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRemovedProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/productOut');
      setRemovedProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching removed products:', error);
      message.error('Failed to fetch removed products!');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRemovedProducts();
  }, []);

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Removed At',
      dataIndex: 'removedAt',
      key: 'removedAt',
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div>
      <div style={{ fontSize: '30px', fontWeight: 'bold' }}>Removed Products</div>
      <Table
        columns={columns}
        dataSource={removedProducts}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
};

export default RemovedProducts;
