import React from 'react';
import {HashLoader} from 'react-spinners';
export const Loader = ({  size }) => {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <HashLoader  size={size} sizeUnit={"px"} color="#245896" />
                </div>
            </div>
        </div>
    )
}