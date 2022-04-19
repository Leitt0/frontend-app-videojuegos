import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Navigation from "../layout/Navigation";
import './Signup.css';
import { signup } from './apiCore'

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }


    const signUpForm = () => (
        <form className="sign-box">
            <div className="form-group mb-3">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange('name')}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group mb-4">
                <label>Password</label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Sign in
            </button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger position-fixed fixed-bottom" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )


    const showSuccess = () => (
        <div className="alert alert-success position-fixed fixed-bottom " role="alert" style={{ display: success ? '' : 'none' }}>
            Account create successfully, click to
            <Link className="alert-link" to='/signin'> Sign in</Link>
        </div>
    )


    return (
        <>
            <Navigation></Navigation>
            <div className="mt-5">
                <h4 className="mb-4 text-center">Sign up</h4>
                {showError()}
                {showSuccess()}
                {signUpForm()}
            </div>
        </>
    )
}

export default Signup;