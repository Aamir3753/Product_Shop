import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader } from './LoaderComponent';
import { delProduct } from '../redux/ActionCreaters';
const mapStateToProps = (store) => ({
    products: store
});
class Home extends React.Component {
    delHandler = (product) => () => {
        let confirmation = window.confirm("Are you sure you want to delete the " + product.name);
        if (confirmation) {
            this.props.dispatch(delProduct(product.id));
            return;
        }
        else {
            return;
        }
    }
    render() {
        if (this.props.products.isLoading) {
            return <Loader size={150} />
        }
        else if (this.props.products.products.length === 0) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/createproduct" className="btn ml-4 mt-4 mb-2 btn-primary">Create Product</Link>
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
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/createproduct" className="btn ml-4 mt-4 mb-2 btn-primary">Create Product</Link>
                        </div>
                    </div>
                    <div className="row m-4">
                        <div className="col-12 table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th colSpan="3" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.products.products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>
                                                <Link to={`productdetail/${product.id}`} className="btn btn-info btn-sm">Read One</Link>
                                            </td>
                                            <td>
                                                <Link to={`editproduct/${product.id}`} className="btn btn-primary btn-sm">Edit</Link>
                                            </td>
                                            <td>
                                                <button onClick={this.delHandler(product)} className="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default connect(mapStateToProps)(Home);