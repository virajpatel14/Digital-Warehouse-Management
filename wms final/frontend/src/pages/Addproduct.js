import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../features/category/categorySlice";
import { getAProduct, resetState, createProducts, updateProducts } from "../features/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
import PageAuth from '../components/PageAuth';

let schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    price: yup.number().required("Price is Required"),
    description: yup.string().required("Description is Required"),
    collectionId: yup.string().required("Category is Required"),
});

const Addproduct = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getProductId = location.pathname.split("/")[3];

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const categoryState = useSelector((state) => state.category.category) || [];
    const newProduct = useSelector((state) => state.product.oneproduct.product) || {};
    console.log(newProduct);
    const productState = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProducts, updatedProducts } = productState;

    console.log("Fetched product: ", productState);


    useEffect(() => {
        if (getProductId !== undefined) {
            dispatch(getAProduct(getProductId));
        } else {
            dispatch(resetState());
        }
    }, [getProductId, dispatch]);

    const initialValues = {
        name: newProduct?.name || '',
        price: newProduct?.price || '',
        description: newProduct?.description || '',
        collectionId: newProduct?.collectionId || '',
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('collectionId', values.collectionId);

            if (getProductId !== undefined) {
                dispatch(updateProducts({ productId: getProductId, productData: formData }));
                dispatch(resetState());
            } else {
                dispatch(createProducts(formData));
                navigate('/admin')
                formik.resetForm();
            }
            dispatch(resetState());
        },
    });

    const buttonStyle = {
        width: '150px',
        margin: '0 auto',
        display: 'block'
    };

    return (
        <div>
            <h3 className="mb-4 title">{getProductId !== undefined ? "Update" : "Add"} Product</h3>
            <div>
                <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
                    <CustomInput
                        type="text"
                        label="Enter Product Name"
                        name="name"
                        onChng={formik.handleChange("name")}
                        onBlr={formik.handleBlur("name")}
                        val={formik.values.name}
                    />
                    <div className="error">{formik.touched.name && formik.errors.name}</div>
                    <CustomInput
                        type="text"
                        label="Enter Product Description"
                        name="description"
                        onChng={formik.handleChange("description")}
                        onBlr={formik.handleBlur("description")}
                        val={formik.values.description}
                    />
                    <div className="error">{formik.touched.description && formik.errors.description}</div>
                    <select
                        name="collectionId"
                        onChange={formik.handleChange("collectionId")}
                        onBlur={formik.handleBlur("collectionId")}
                        value={formik.values.collectionId}
                        className="form-control py-3 mb-3"
                    >
                        <option value="">Select Category</option>
                        {categoryState.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <div className="error">{formik.touched.collectionId && formik.errors.collectionId}</div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        onChng={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                        val={formik.values.price}
                    />
                    <div className="error">{formik.touched.price && formik.errors.price}</div>

                    <button
                        className="btn btn-primary border-0 rounded-3 my-5"
                        type="submit"
                        style={buttonStyle}
                    >
                        {getProductId !== undefined ? "Update" : "Add"} Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PageAuth(Addproduct);
