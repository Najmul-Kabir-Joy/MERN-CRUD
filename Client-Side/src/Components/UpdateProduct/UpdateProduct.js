import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Container, FloatingLabel, Form, Button } from 'react-bootstrap';
import { useHistory, useLocation, useParams } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const [product, setProduct] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/update/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [])
    const handleNameChange = e => {
        const updatedProduct = { ...product };
        updatedProduct.productname = e.target.value;
        setProduct(updatedProduct);
    }
    const handlePriceChange = e => {
        const updatedProduct = { ...product };
        updatedProduct.price = e.target.value;
        setProduct(updatedProduct);
    }
    const handleQuantityChange = e => {
        const updatedProduct = { ...product };
        updatedProduct.quantity = e.target.value;
        setProduct(updatedProduct);
    }
    const handleUnitChange = e => {
        const updatedProduct = { ...product };
        updatedProduct.unit = e.target.value;
        setProduct(updatedProduct);
    }
    const location = useLocation();
    const history = useHistory();
    const redirectUrl = location.state?.from || '/productlist';
    console.log(redirectUrl);
    const handleUpdateProduct = e => {
        const url = `http://localhost:5000/update/${id}`
        axios.put(url, product)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast('✅ Product updated successfully', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    reset();
                    window.setTimeout(() => {
                        history.push(redirectUrl)
                    }, 1500)
                }
            });
        e.preventDefault();
    }

    //onChange={handleNameChange} value={product.productname || ''}
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Container className="from-container">
                <h4 className='text-center mb-3'>Update {product.productname}</h4>

                <div className='main-form'>
                    <Form onSubmit={handleUpdateProduct}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Product Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" onChange={handleNameChange} value={product.productname || ''} placeholder="Product name" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Product Price"
                            className="mb-3"
                        >
                            <Form.Control type="number" onChange={handlePriceChange} value={product.price || ''} placeholder="Product price" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Product Quantity"
                            className="mb-3"
                        >
                            <Form.Control type="number" onChange={handleQuantityChange} value={product.quantity || ''} placeholder="Product quantity" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Unit(kg/ltr)"
                            className="mb-3"
                        >
                            <Form.Control type="text" onChange={handleUnitChange} value={product.unit || ''} placeholder="Product unit" />
                        </FloatingLabel>

                        <Button type='submit' className='mt-3 d-block mx-auto'>UPDATE PRODUCT</Button>
                        <Link to='/productlist' className='mt-3 d-block text-center'>See product list</Link>

                    </Form>
                </div>
            </Container>

        </div>
    );
};

export default UpdateProduct;