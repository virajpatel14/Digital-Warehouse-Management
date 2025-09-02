import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Enter a valid email").required("Email is required"),
        password: Yup.string().required("Password is required")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },

        validationSchema: schema,

        onSubmit: (values) => {
            dispatch(signup(values));
        },
    });

    const authState = useSelector((state) => state);
    const { user, isLoading, isError, isSuccess, message } = authState.auth;

    useEffect(() => {
        if (isSuccess) {
            navigate("/admin");
        } else {
            navigate("");
        }
    }, [user, isLoading, isError, isSuccess, navigate]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.title} className="text-center">Signup</h3>
                <p style={styles.subtitle} className="text-center">Signup to your account to continue</p>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        type="text"
                        name="name"
                        label="Name"
                        id="name"
                        onChng={formik.handleChange("name")}
                        val={formik.values.name} 
                    />
                    <div style={styles.error}>
                        {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <CustomInput 
                        type="text"
                        name="email"
                        label="Email address"
                        id="email"
                        onChng={formik.handleChange("email")}
                        val={formik.values.email} 
                    />
                    <div style={styles.error}>
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput 
                        type="password"
                        name="password"
                        label="Password"
                        id="password"
                        onChng={formik.handleChange("password")}
                        val={formik.values.password} 
                    />
                    <div style={styles.error}>
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div style={styles.linkContainer} className="text-end mt-2">
                        Already have an account? <Link to="/" style={styles.link}>Login</Link>
                    </div>
                    <button
                        style={styles.button}
                        className="signup-button"
                        type="submit"
                    >
                        {isLoading ? 'Signing up...' : 'Signup'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5',
        minHeight: '100vh',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        marginBottom: '1rem',
        fontSize: '1.5rem',
        color: '#333',
    },
    subtitle: {
        marginBottom: '2rem',
        color: '#666',
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
    },
    linkContainer: {
        marginTop: '1rem',
        textAlign: 'right',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
    button: {
        background: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '1rem',
        marginTop: '1.5rem',
        transition: 'background 0.3s ease, transform 0.3s ease',
    },
};

export default Signup;