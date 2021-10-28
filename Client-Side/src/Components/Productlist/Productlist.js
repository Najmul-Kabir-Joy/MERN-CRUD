import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RowGenerator from '../RowGenerator/RowGenerator';

const Productlist = () => {
    const [list, setList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    useEffect(() => {
        fetch(`http://localhost:5000/productlist?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
                setList(data.products)
            })
    }, [page, size])
    const handleDelete = (id) => {
        const approve = window.confirm('You really want to delete?')
        if (approve) {
            const url = `http://localhost:5000/productlist/${id}`;
            axios.delete(url)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        toast('✅ Product deleted successfully', {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        const remains = list.filter(item => item._id !== id);
                        setList(remains);
                    }
                })
        }
    }
    const handleChange = e => {
        setSize(e.target.value);

    }
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
            <Container>
                <h2 className='text-center mb-3'>Product at Inventory</h2>
                <div className='row'>
                    <div className='text-start col'>
                        <select name="pagesize" onChange={handleChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className='text-end col'><Link to='addproduct' style={{ textDecoration: 'none' }}><Button>ADD NEW</Button></Link></div>
                </div>

                <Table striped bordered hover size="sm">
                    <thead className='text-center'>
                        <tr>
                            <th>Sl.</th>
                            <th>Product Name</th>
                            <th>Price/unit</th>
                            <th>Quanity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item, index) => <RowGenerator key={item._id} item={item} index={index} handleDelete={handleDelete}></RowGenerator>)
                        }

                    </tbody>
                </Table>
                <Pagination className='justify-content-center'>
                    {
                        [...Array(pageCount).keys()].map(num =>
                            <Pagination.Item
                                key={num}
                                onClick={() => setPage(num)}
                                active={num === page}
                            >
                                {num + 1}
                            </Pagination.Item>)
                    }
                </Pagination>
            </Container>
        </div>
    );
};

export default Productlist;