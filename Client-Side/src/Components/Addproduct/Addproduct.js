import React from 'react';
import axios from 'axios';
import { Container, FloatingLabel, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Addproduct.css';
import { Link } from 'react-router-dom';

const Addproduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        axios.post('http://localhost:5000/productlist', data)
            .then(res => {
                if (res.data.insertedId) {
                    toast('✅ Product added successfully', {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    reset();
                }
            })

    };
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Container className="from-container">

                <div className='from-header text-center mb-3'>
                    <h3>ADD NEW PRODUCTS TO INVENTORY</h3>
                </div>
                <div className='main-form'>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Product Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Product name" {...register("productname", { required: true, maxLength: 20 })} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Product Price"
                            className="mb-3"
                        >
                            <Form.Control type="number" placeholder="Product price" {...register("price", { required: true })} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Product Quantity"
                            className="mb-3"
                        >
                            <Form.Control type="number" placeholder="Product quantity" {...register("quantity", { required: true })} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Unit(kg/ltr)"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Product unit" {...register("unit", { required: true })} />
                        </FloatingLabel>

                        <Button type='submit' className='mt-3 d-block mx-auto'>ADD NEW PRODUCT</Button>
                        <Link to='/productlist' className='mt-3 d-block text-center'>See product list</Link>
                    </Form>
                </div>
            </Container>
        </>
    );

};

export default Addproduct;