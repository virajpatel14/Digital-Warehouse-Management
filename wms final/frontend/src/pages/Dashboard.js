import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../features/inventory/inventorySlice';
import { getCategory } from '../features/category/categorySlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillPrinter } from 'react-icons/ai';
import PageAuth from '../components/PageAuth';
import mqtt from 'mqtt';
import moment from 'moment';

const columns = [
    { title: 'SNo', dataIndex: 'key' },
    { title: 'Product ID', dataIndex: 'productId' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Quantity', dataIndex: 'quantity' },
    {
        title: 'Date Of Entry',
        dataIndex: 'date',
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
        render: date => moment(date).format('YYYY-MM-DD'),
    },
    { title: 'Total Amount', dataIndex: 'amount' },
    { title: 'Action', dataIndex: 'action' },
];

const Productlist = () => {
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [totalProductsIn, setTotalProductsIn] = useState(0);
    const [totalProductsOut, setTotalProductsOut] = useState(0);
    const [totalNoOfProducts, setTotalNoOfProducts] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [deletedProducts, setDeletedProducts] = useState([]);

    const showModal = (e) => {
        setOpen(true);
        setProductId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

    useEffect(() => {
        client.on('connect', () => {
            console.log('Connected to MQTT Broker');
        });

        client.on('error', (err) => {
            console.log('MQTT connection error:', err);
        });

        return () => {
            client.end();
        };
    }, [client]);

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getAllProducts());

    }, [dispatch]);

    const calculateTotals = (products, removedProducts) => {
        let totalIn = 0;
        let totalOut = removedProducts.reduce((acc, product) => acc + product.quantity, 0);
        let totalQuantity = 0;

        products.forEach((product) => {
            totalIn += product.quantity;
            totalQuantity += product.quantity;
        });

        setTotalProductsIn(totalIn);
        setTotalProductsOut(totalOut);
        setTotalNoOfProducts(totalQuantity - totalOut);
    };

    const productState = useSelector((state) => state.inventory.products);
    const categoryState = useSelector((state) => state.category.category);

    useEffect(() => {
        calculateTotals(productState, deletedProducts);
        setFilteredProducts(productState);
    }, [productState, deletedProducts]);

    const handlePrint = (id) => {
        const payload = JSON.stringify(id);
        client.publish('WarehouseWrite/DeviceUID', payload);
        console.log('Print barcode for product:', id);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        filterProducts(query);
    };

    const filterProducts = (query) => {
        const filtered = productState.filter(product => {
            const matchesQuery = product.name.toLowerCase().includes(query) || product.productId.toString().includes(query);
            return matchesQuery;
        });
        setFilteredProducts(filtered);
    };

    const filterByAvailability = (availability) => {
        if (availability === 'all') {
            setFilteredProducts(productState);
        } else if (availability === 'available') {
            setFilteredProducts(productState.filter(product => product.quantity > 0));
        } else if (availability === 'unavailable') {
            setFilteredProducts(productState.filter(product => product.quantity === 0));
        }
    };

    const data = filteredProducts.map((product, index) => {
        const amount = product.price * product.quantity;
        const date = product.date || new Date().toISOString().split('T')[0];

        return {
            key: index + 1,
            productId: product.productId,
            name: product.name,
            description: product.description,
            category: categoryState.find((category) => category._id === product.collectionId)?.name || '',
            price: ` Rs. ${product.price}`,
            quantity: product.quantity,
            date: date,
            amount: ` Rs. ${amount.toFixed(2)}`,
            action: (
                <>
                    <Link to={`/admin/product/${product._id}`} className="text-success" style={{ fontSize: '1.5rem' }}>
                        <BiEdit />
                    </Link>

                    <button className="ms-2 text-primary bg-transparent border-0" style={{ fontSize: '1.5rem' }} onClick={() => handlePrint(product.productId)}>
                        <AiFillPrinter />
                    </button>
                </>
            ),
        };
    });

    return (
        <div>
            <div className="mt-4">
                {/* <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
                        <div>
                            <p className="mb-0">Total products In</p>
                            <h4 className="mb-0">{totalProductsIn}</h4>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <p className="mb-0"></p>
                        </div>
                    </div>
                    <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
                        <div>
                            <p className="mb-0">Total products Out</p>
                            <h4 className="mb-0">{totalProductsOut}</h4>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <p className="mb-0"></p>
                        </div>
                    </div>
                    <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white p-3 rounded-3">
                        <div>
                            <p className="mb-0">Total No. of Products</p>
                            <h4 className="mb-0">{totalNoOfProducts}</h4>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <p className="mb-0"></p>
                        </div>
                    </div>
                </div> */}

                <div className="search-and-buttons-container">

                    <Input
                        placeholder="Search by name or Id"
                        value={searchQuery}
                        onChange={handleSearch}
                        style={{ marginBottom: '20px', width: '300px',fontWeight:'bold' }}
                    />
                    <div className="d-flex">
                        <Button onClick={() => filterByAvailability('all')} style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white',fontWeight:'bold' }}>All Items</Button>
                        <Button onClick={() => filterByAvailability('available')} style={{ marginRight: '10px', backgroundColor: 'green', color: 'white',fontWeight:'bold' }}>Available Items</Button>
                        <Button onClick={() => filterByAvailability('unavailable')} style={{ backgroundColor: 'red', color: 'white',fontWeight:'bold' }}>Unavailable Items</Button>
                    </div>
                </div>


                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', fontFamily: 'Courier, monospace' }}>
                    <h2 style={{ fontFamily: 'Courier, monospace',fontWeight:'bold',fontSize:'40px' ,textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>INVENTORY TABLE</h2>
                </div>
                <div className="table-container">
                    <Table columns={columns} dataSource={data} className="custom-table" />
                </div>
                <style jsx>{`
                     .search-and-buttons-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 20px;
                        margin-top: 0px;
                    }
                    .search-and-buttons-container .d-flex {
                        margin-top: 0px;
                        
                    }
                    .table-container {
                        border-style: solid;
                        border-color: #f0f0f1;
                        border-radius: 8px;
                        overflow-x: auto;
                        width: 100%; /* Set the width to 100% */
                        max-width: 120%; /* Optional: Ensure it doesn't exceed the viewport */
                    }
                    .custom-table .ant-table-thead > tr > th,
                    .custom-table .ant-table-tbody > tr > td {
                    
                        border-right: 3px solid #f0f0f0;
                        border-bottom: 3px solid #f0f0f0;
                        text-align: center;
                    }
                    .custom-table .ant-table-thead > tr > th:last-child,
                    .custom-table .ant-table-tbody > tr > td:last-child {
                        border-right: none;
                        text-align: center;
    }
                    .action-icon {
                        font-size: 0.75rem; /* Adjust the font size for smaller icons */
                    }
                `}</style>
            </div>
        </div>
    );
};

export default PageAuth(Productlist);