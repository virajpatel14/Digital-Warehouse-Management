import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import PageAuth from '../components/PageAuth';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  let schema = Yup.object().shape({
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);
  const { user, isLoading, isError, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="login-container" style={styles.container}>
      <div className="login-card" style={styles.card}>
        <h3 className="text-center" style={styles.title}>Login</h3>
        <p className="text-center" style={styles.subtitle}>Login to your account to continue</p>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput 
            type="text"
            name="email"
            label="Email address"
            i_id="email"
            onChng={formik.handleChange("email")}
            val={formik.values.email} 
          />
          <div className="error" style={styles.error}>
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput 
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            i_id="password"
            onChng={formik.handleChange("password")}
            val={formik.values.password} 
            showPassword={showPassword}
            onTogglePassword={togglePasswordVisibility}
          />
          <div className="error" style={styles.error}>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          {isError && <div className="error" style={styles.error}>Account does not exist</div>}
          <div className="text-end mt-2" style={styles.linkContainer}>Do not have an account? <Link to="/signup" style={styles.link}>Signup</Link>
          </div>
          <button
            className="login-button"
            style={styles.button}
            type="submit"
          >
            {isLoading ? 'Logging in...' : 'Login'}
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
    transition: 'background 0.3s ease',
  },
};

export default PageAuth(Login);
