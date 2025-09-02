import React, { useEffect, useState } from 'react';
import { Table, Modal, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRemovedProducts } from '../features/ItemsOut/itemSlice'; // Adjust import path as needed
import { getCategory } from '../features/category/categorySlice';
import PageAuth from '../components/PageAuth';
import moment from 'moment';

const ItemsOut = () => {
    const dispatch = useDispatch();
    const categoryState = useSelector((state) => state.category.category);
    const removedProduct = useSelector((state) => state.item);
    const { removedProducts, isLoading } = removedProduct;

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        dispatch(getAllRemovedProducts());
        dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(removedProducts);
    }, [removedProducts]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleModalClose = () => {
        setSelectedProduct(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        filterProducts(query);
    };

    const filterProducts = (query) => {
        const filtered = removedProducts.filter((product) => {
            const matchesName = product.name.toLowerCase().includes(query);
            const matchesProductId = product.productId.toString().toLowerCase().includes(query);
            return matchesName || matchesProductId;
        });
        setFilteredProducts(filtered);
    };

    const removedProductsColumns = [
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
            title: 'Date of Exit',
            dataIndex: 'date',
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            render: date => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Total Amount',
            dataIndex: 'amount',
        },
    ];

    const removedProductsData = Array.isArray(filteredProducts)
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
                price: price,
                quantity: quantity,
                date: formatDate(product.date || new Date()), // Auto-generate date if not provided
                amount: amount,
            };
        })
        : [];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', fontFamily: 'Roboto, sans-serif' }}>
                <h2 style={{ fontFamily: 'Courier, monospace' ,fontWeight:'bold',fontSize:'40px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>REMOVED PRODUCTS</h2>
            </div>
            <Input
                placeholder="Search by name or ID"
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginBottom: '20px', width: '300px',fontWeight:'bold' }}
            />

            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Table
                        columns={removedProductsColumns}
                        dataSource={removedProductsData}
                        className="custom-table"
                        onRow={(record) => {
                            return {
                                onClick: () => handleProductClick(record),
                            };
                        }}
                    />
                )}
            </div>
            {/* {selectedProduct && (
                <Modal
                    title="Product Details"
                    visible={!!selectedProduct}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    <p><strong>ProductId:</strong> {selectedProduct.productId}</p>
                    <p><strong>Name:</strong> {selectedProduct.name}</p>
                    <p><strong>Description:</strong> {selectedProduct.description}</p>
                    <p><strong>Category:</strong> {selectedProduct.category}</p>
                    <p><strong>Price:</strong> {selectedProduct.price}</p>
                    <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                    <p><strong>Date of Exit:</strong> {selectedProduct.date}</p>
                    <p><strong>Total Amount:</strong> {selectedProduct.amount}</p>
                </Modal>
            )} */}
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

export default PageAuth(ItemsOut);