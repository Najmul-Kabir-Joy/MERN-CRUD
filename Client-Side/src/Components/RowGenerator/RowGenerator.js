import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RowGenerator = (props) => {
    const { productname, quantity, unit, price, _id } = props.item;
    const { index, handleDelete } = props;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{productname}</td>
            <td>{price}tk/{unit}</td>
            <td>{quantity}{unit}</td>
            <td className='text-center'> <Link to={`/update/${_id}`} style={{ textDecoration: 'none' }}><button className='btn btn-outline-success'><i className="fas fa-edit"></i>Edit</button></Link> <button className='btn btn-outline-danger' onClick={() => handleDelete(_id)}><i className="fas fa-trash"></i></button></td>
        </tr>
    );
};

export default RowGenerator;