import React, { useState } from 'react';
import "./loginPage.css";
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');
      
      try {
        const result = await login(values.email, values.password);
        
        if (result.success) {
          navigate('/');
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('An error occurred during login. Please try again.');
        console.error('Login error:', err);
      } finally {
        setIsLoading(false);
      }
    }
  });  return (
    <div className="rentiva-admin-login">
      <div className="rentiva-admin-login__container">
        <div className="rentiva-admin-login__header">
          <p className="rentiva-admin-login__title">Rentiva</p>
          <p className="rentiva-admin-login__subtitle">Admin Panel</p>
          <div className="rentiva-admin-login__accent-line"></div>
        </div>

        {error && (
          <div className="rentiva-admin-login__alert">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="rentiva-admin-login__form">
          <div className="rentiva-admin-login__input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              className={`rentiva-admin-login__input ${
                formik.touched.email && formik.errors.email ? 'rentiva-admin-login__input--error' : ''
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="rentiva-admin-login__error-text">{formik.errors.email}</div>
            )}
          </div>

          <div className="rentiva-admin-login__input-group">
            <div className="rentiva-admin-login__password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                className={`rentiva-admin-login__input ${
                  formik.touched.password && formik.errors.password ? 'rentiva-admin-login__input--error' : ''
                }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="rentiva-admin-login__password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="rentiva-admin-login__error-text">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className={`rentiva-admin-login__button ${isLoading ? 'rentiva-admin-login__button--loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="rentiva-admin-login__demo-info">
          <div className="rentiva-admin-login__demo-title">Demo credentials</div>
          <div className="rentiva-admin-login__demo-text">
            Uses a real database
          </div>
          <div className="rentiva-admin-login__demo-credentials">
            admin@rentiva.com / admin123
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
