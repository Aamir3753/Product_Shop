import React from 'react';
import { connect } from 'react-redux';
import { Loader } from './LoaderComponent';
import {Breadcrumb,BreadcrumbItem} from 'reactstrap'
import { Link } from 'react-router-dom';
const mapPropsToState = (store) => ({
    products: store
})
let ProductDetail = (props) => {
    if (props.products.isLoading) {
        return <Loader size={150} />
    }
    if (props.products.products.length === 0) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Link to="/Product_Shop/createproduct" className="btn ml-4 mt-4 mb-2 btn-primary">Create Product</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center">List Empty!</h3>
                    </div>
                </div>
            </div>
        )
    }
    else {
        let product =
            props.products.products.filter(product => product.id === Number(props.match.params.id))[0];
        if (!product) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/Product_Shop/createproduct" className="btn ml-4 mt-4 mb-2 btn-primary">Create Product</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-center">Product not found!</h3>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/Product_Shop/home">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>Product_Detail</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-center">Product Detail</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Product Id</td>
                                        <td>{product.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>{product.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Product Description</td>
                                        <td>{product.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Product Category</td>
                                        <td>{product.category}</td>
                                    </tr>
                                    <tr>
                                        <td>Entery Date</td>
                                        <td>{product.date}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default connect(mapPropsToState)(ProductDetail);
