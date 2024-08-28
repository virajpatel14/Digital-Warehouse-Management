import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../features/category/categorySlice";
import { createProducts, resetState, updateProduct } from "../features/product/productSlice";
import PageAuth from '../components/PageAuth';

let schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    price: yup.number().required("Price is Required"),
    description: yup.string().required("Description is Required"),
    collectionId: yup.string().required("Category is Required"),
    quantity: yup.number().required("Quantity is Required"),
});

const updateproduct = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const categoryState = useSelector((state) => state.category.category);

    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProducts } = newProduct;
    useEffect(() => {
        if (isSuccess && createdProducts) {
            toast.success("Product Added Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createdProducts]);

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            description: '',
            collectionId: '',
            quantity: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            const productData = new FormData();
            productData.append('name', values.name);
            productData.append('price', values.price);
            productData.append('description', values.description);
            productData.append('collectionId', values.collectionId);
            productData.append('quantity', values.quantity);

            dispatch(createProducts(productData));

            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        },
    });

    const buttonStyle = {
        width: '150px',
        margin: '0 auto',
        display: 'block'
    };

    return (
        <div>
            <h3 className="mb-4 title">Update Product</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-3 flex-column"
                >
                    <CustomInput
                        type="text"
                        label="Enter Product Name"
                        name="name"
                        onChng={formik.handleChange("name")}
                        onBlr={formik.handleBlur("name")}
                        val={formik.values.name}
                    />
                    <div className="error">
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <CustomInput
                        type="text"
                        label="Enter Product Description"
                        name="description"
                        onChng={formik.handleChange("description")}
                        onBlr={formik.handleBlur("description")}
                        val={formik.values.description}
                    />
                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <select
                        name="collectionId"
                        onChange={formik.handleChange("collectionId")}
                        onBlur={formik.handleBlur("collectionId")}
                        value={formik.values.collectionId}
                        className="form-control py-3 mb-3"
                        id=""
                    >
                        <option value="">Select Category</option>
                        {categoryState.map((i, j) => {
                            return (
                                <option key={j} value={i._id}>
                                    {i.name}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.collectionId && formik.errors.collectionId}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        onChng={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                        val={formik.values.price}
                    />
                    <div className="error">
                        {formik.touched.price && formik.errors.price}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Quantity"
                        name="squantity"
                        onChng={formik.handleChange("quantity")}
                        onBlr={formik.handleBlur("quantity")}
                        val={formik.values.quantity}
                    />
                    <div className="error">
                        {formik.touched.quantity && formik.errors.quantity}
                    </div>
                    <button
                        className="btn btn-primary border-0 rounded-3 my-5"
                        type="submit"
                        style={buttonStyle} // Apply custom styles
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PageAuth(updateproduct);
