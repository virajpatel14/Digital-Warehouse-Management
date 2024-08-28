import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAddedProducts } from '../features/ItemsIn/iteminSlice'; // Adjust import path as needed
import { getCategory } from '../features/category/categorySlice';
import PageAuth from '../components/PageAuth';
import moment from 'moment';

const ItemsIn = () => {
    const dispatch = useDispatch();
    const categoryState = useSelector((state) => state.category.category);
    const AddedProduct = useSelector((state) => state.item);
    const { AddedProducts, isLoading } = AddedProduct;
    const { addedProducts } = useSelector((state) => state.itemin);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getAllAddedProducts());
        dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(addedProducts);
    }, [addedProducts]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        filterProducts(query);
    };

    const filterProducts = (query) => {
        if (!query) {
            setFilteredProducts(addedProducts);
            return;
        }

        const filtered = addedProducts.filter(product => {
            const matchesQuery = product.name.toLowerCase().includes(query) || product.productId.toString().includes(query);
            return matchesQuery;
        });
        setFilteredProducts(filtered);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const AddedProductsColumns = [
        {
            title: 'SNo',
            dataIndex: 'key',
        },
        {
            title: 'ProductId',
            dataIndex: 'productId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Date Of Entry',
            dataIndex: 'date',
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            render: date => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Total Amount',
            dataIndex: 'amount',
        },
    ];

    const AddedProductsData = Array.isArray(filteredProducts)
        ? filteredProducts.slice().reverse().map((product, index) => {
            const category = categoryState.find((category) => category._id === product.collectionId);
            const price = product.price || 0;
            const quantity = product.quantity || 0;
            const amount = price * quantity;
            return {
                key: index + 1,
                productId: product.productId,
                name: product.name,
                description: product.description,
                category: category ? category.name : 'Unknown', // default to 'Unknown' if category not found
                price: ` Rs. ${price}`,
                quantity: quantity,
                date: formatDate(product.date || new Date()), // Auto-generate date if not provided
                amount: `Rs. ${amount.toFixed(2)}`,
            };
        })
        : [];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', fontFamily: 'Roboto, sans-serif' }}>
                <h2 style={{ fontFamily: 'Courier, monospace',fontWeight:'bold',fontSize:'40px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>ADDED PRODUCTS</h2>
            </div>
            <div className="search-and-buttons-container">
                <Input
                    placeholder="Search by name or ID"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ marginBottom: '20px', width: '300px',fontWeight:'bold' }}
                />
            </div>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Table
                        columns={AddedProductsColumns}
                        dataSource={AddedProductsData}
                        className="custom-table"
                    />
                )}
            </div>
            
            <style>{`
                .custom-table .ant-table-thead > tr > th,
                .custom-table .ant-table-tbody > tr > td {
                    border-right: 1px solid #f0f0f0; /* Add right border */
                    border-bottom: 1px solid #f0f0f0; /* Add bottom border */
                    text-align: center; /* Corrected from 'align-text' to 'text-align' */
                }

                .custom-table .ant-table-thead > tr > th:last-child,
                .custom-table .ant-table-tbody > tr > td:last-child {
                    border-right: none; /* Remove right border for the last column */
                }
            `}</style>
        </div>
    );
};

export default PageAuth(ItemsIn);