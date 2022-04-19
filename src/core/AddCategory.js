import React, { useState } from "react";
import Navigation from '../layout/Navigation'
import { Link } from 'react-router-dom';
import { isAuthenticated, createCategory } from "./apiCore";

import './AddCategory.css';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated

    const handleChange = (event) => {
        setError('');
        setName(event.target.value)
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setError('')
        setSuccess(false)
        // make api call to end point
        createCategory(/* user._id, */ token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError('');
                    setSuccess(true);
                }
            })
    }

    const showSuccess = () => {
        if (success) {
            return <div className="alert alert-success position-fixed fixed-bottom" role="alert">The category "{name}" was successfully created</div>
        }
    }

    const showError = () => {
        if (error) {
            return <div className="alert alert-danger position-fixed fixed-bottom">"{name}" should be unique, try another one</div>
        }
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit} className="newCategoryForm">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control"
                    onChange={handleChange} value={name} required autoFocus />
            </div>
            <button className="btn btn-outline-success mt-3">
                Create category
            </button>
        </form>
    )

    const goBack = () => (
        <div className="mt-5">
            <Link to="/" className="text-warning">
                Back to dashboard
            </Link>
        </div>
    )


    return (
        <>
            <Navigation />
            <div className="mt-5 container">
            <h4 className="mb-4 text-center">Add new category</h4>
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
            </div>
        </>
    )
}

export default AddCategory;