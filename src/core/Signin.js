import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navigation from "../layout/Navigation";
import './Signin.css';
import { signin, authenticate, isAuthenticated } from "./apiCore";


const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(
                        data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            })
                        }
                    )
                }
            })
    }




    const singInForm = () => (
        <form className="sign-box">
            <div className="form-group mb-3">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    value={email} />
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary ">
                Sign in
            </button>
        </form>
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Navigate to="/admin/dashboard" />
            } else {
                return <Navigate to="/" />
            }
        }
        if(isAuthenticated()) {
            return <Navigate to="/" />
        }
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    )


    return (
        <div>
            <Navigation></Navigation>
            <div className="mt-5">
                <h4 className="mb-4 text-center">Sign in</h4>
                {singInForm()}
                {showError()}
                {showLoading()}
                {redirectUser()}
            </div>
        </div>
    )
}

export default Signin;