import React, { useEffect, useState } from "react";
import Navigation from '../layout/Navigation';
import { isAuthenticated, getCategories, createVideogame } from "./apiCore";

import './AddVideogame.css';


const AddVideogame = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdVideogame: '',
        rediretToProfile: false,
        formData: ''
    })
    const { user, token } = isAuthenticated();

    const { name, description, price, categories, category, quantity, photo, loading, error, createdVideogame, rediretToProfile, formData
    } = values

    const getAllCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, categories: data, formData: new FormData() })
            }
        })
    }

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const showSuccess = () => (
        <div
            className="alert alert-success position-fixed fixed-bottom" role="alert"
            style={{ display: createdVideogame ? '' : 'none' }}
        >
            {createdVideogame} has been addeed successfully
        </div>
    )
    const showError = () => (
        <div
            className="alert alert-danger position-fixed fixed-bottom"
            style={{ display: error ? '' : 'none' }}
        >
            {error}
        </div>
    )

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading ...</h2>
            </div>
        )

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true })
        createVideogame(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    price: '',
                    quantity: '',
                    photo: '',
                    loading: false,
                    createVideogame: data.name
                })
            }
        })
    }

    const newPostForm = () => (
        <form className="newPostForm mt-3" onSubmit={clickSubmit}>
            <h4>Post videogame</h4>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange('name')}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input
                    onChange={handleChange('description')}
                    type="text"
                    className="form-control"
                    value={description}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handleChange('price')}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange('category')}
                    type="text"
                    className="form-control"
                >
                    <option>Select Category</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={handleChange('quantity')}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Photo</label>
                <input
                    className="d-block"
                    onChange={handleChange('photo')}
                    type='file'
                    name="photo"
                    accept="image/*"
                />
            </div>
            <button className="btn btn-outline-primary mt-3">Create videogame</button>
        </form>
    )

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        getAllCategories();
    }, []);

    return (
        <>
            <Navigation></Navigation>
            <div className="container">
                {showError()}
                {showSuccess()}
                {showLoading()}
                {newPostForm()}
            </div>
        </>
    )

}

export default AddVideogame;