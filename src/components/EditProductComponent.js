import React from 'react';
import { Form, FormGroup, Breadcrumb, BreadcrumbItem, Label, Button, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import { editProduct } from '../redux/ActionCreaters';
import { Link } from 'react-router-dom';
import { Loader } from './LoaderComponent';
const mapPropsToState = (store) => ({
    products: store
})
class EditProduct extends React.Component {
    state = {
        nameIsValid: true,
        nameIsInvalid: false,
        nameErrMess: "",

        descriptionIsValid: true,
        descriptionIsInvalid: false,
        descriptionErrMess: "",

        priceIsValid: true,
        priceIsInvalid: false,
        priceErrMess: "",

        categoryIsValid: true,
        categoryIsInvalid: false,
        categoryErrMess: ""
    }
    product = () => {
        return this.props.products.products.filter(product => product.id === Number(this.props.match.params.id))[0]
    }
    submitHandler = (event) => {
        event.preventDefault();
        let target = this.refs;
        if (this.state.nameIsValid && this.state.descriptionIsValid && this.state.priceIsValid && this.state.categoryIsValid) {
            let product = this.product();
            this.props.dispatch(editProduct({
                name: document.getElementById("product_name").value,
                description: document.getElementById("product_description").value,
                price: document.getElementById("product_price").value,
                category: document.getElementById("product_category").value,
                id: product.id,
                date: product.date
            }))
            this.props.history.push("/Product_Shop/home");
        }
        else {
            if (!this.state.nameIsValid) {
                this.setState({ nameErrMess: "Validate this field", nameIsInvalid: true })
                document.getElementById("product_name").focus();
            }
            else if (!this.state.descriptionIsValid) {
                this.setState({ descriptionErrMess: "Validate this field", descriptionIsInvalid: true })
                document.getElementById("product_description").focus();
            }
            else if (!this.state.priceIsValid) {
                this.setState({ priceErrMess: "Validate this field", priceIsInvalid: true })
                document.getElementById("product_price").focus();                
            }
            else if (!this.state.categoryIsValid) {
                this.setState({ categoryErrMess: "Validate this field", categoryIsInvalid: true })
                document.getElementById("product_category").focus();                target.product_category.focus();
            }
        }
    }
    inputHandler = (event) => {
        let target = event.target;
        switch (target.id) {
            case "product_name":
                if (target.value.trim().length === 0) {
                    this.setState({ nameIsValid: false, nameIsInvalid: true, nameErrMess: "Enter product name" })
                }
                else if (target.value.length > 15) {
                    this.setState({ nameIsValid: false, nameIsInvalid: true, nameErrMess: "Name should be less than 15 characters" })
                }
                else if (target.value.length < 3) {
                    this.setState({ nameIsValid: false, nameIsInvalid: true, nameErrMess: "Name should be greater than 3 characters" })
                }
                else {
                    this.setState({ nameIsValid: true, nameIsInvalid: false, nameErrMess: "" })
                }
                break;
            case "product_description":
                if (target.value.trim().length === 0) {
                    this.setState({ descriptionIsValid: false, descriptionIsInvalid: true, descriptionErrMess: "Enter product description" })
                }
                else if (target.value.length > 20) {
                    this.setState({ descriptionIsValid: false, descriptionIsInvalid: true, descriptionErrMess: "Description should be less than 30 characters" })
                }
                else if (target.value.length < 3) {
                    this.setState({ descriptionIsValid: false, descriptionIsInvalid: true, descriptionErrMess: "Description should be greater than 3 characters" })
                }
                else {
                    this.setState({ descriptionIsValid: true, descriptionIsInvalid: false, descriptionErrMess: "" })
                }
                break;
            case "product_price":
                if (target.value.trim().length === 0) {
                    this.setState({ priceIsValid: false, priceIsInvalid: true, priceErrMess: "Enter product price" })
                }
                else if (isNaN(Number(target.value))) {
                    this.setState({ priceIsValid: false, priceIsInvalid: true, priceErrMess: "Enter valid price" })
                }
                else {
                    this.setState({ priceIsValid: true, priceIsInvalid: false, priceErrMess: "" })
                }
                break;
            case "product_category":
                if (target.value.trim().length === 0) {
                    this.setState({ categoryIsValid: false, categoryIsInvalid: true, categoryErrMess: "Enter product category" })
                }
                else if (target.value.length > 20) {
                    this.setState({ categoryIsValid: false, categoryIsInvalid: true, categoryErrMess: "Category should be less than 30 characters" })
                }
                else if (target.value.length < 3) {
                    this.setState({ categoryIsValid: false, categoryIsInvalid: true, categoryErrMess: "Category should be greater than 3 characters" })
                }
                else {
                    this.setState({ categoryIsValid: true, categoryIsInvalid: false, categoryErrMess: "" })
                }
                break;
            default:
                return
        }
    }
    render() {
        let product = this.product();
        if (this.props.products.isLoading) {
            return <Loader size={150} />
        }
        else if (!product) {
            return (
                <div className="container">
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
                                <BreadcrumbItem active>Edit_Product</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="text-center">Create Product</h4>
                            <Form onSubmit={this.submitHandler}>
                                <FormGroup>
                                    <Label htmlFor="product_name">Product Name</Label>
                                    <Input onInput={this.inputHandler}
                                        invalid={this.state.nameIsInvalid}
                                        valid={this.state.nameIsValid}
                                        defaultValue={product.name}
                                        ref="product_name"
                                        type="text" id="product_name" />
                                    <FormFeedback>{this.state.nameErrMess}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="product_discription">Description</Label>
                                    <Input type="text" onInput={this.inputHandler}
                                        invalid={this.state.descriptionIsInvalid}
                                        valid={this.state.descriptionIsValid}
                                        ref="product_description"
                                        defaultValue={product.description}
                                        id="product_description" />
                                    <FormFeedback>{this.state.descriptionErrMess}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="product_price">Price</Label>
                                    <Input type="text" onInput={this.inputHandler}
                                        invalid={this.state.priceIsInvalid}
                                        valid={this.state.priceIsValid}
                                        ref="product_price"
                                        defaultValue={product.price}
                                        id="product_price" />
                                    <FormFeedback>{this.state.priceErrMess}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="product_category">Category</Label>
                                    <Input type="text" onInput={this.inputHandler}
                                        invalid={this.state.categoryIsInvalid}
                                        valid={this.state.categoryIsValid}
                                        defaultValue={product.category}
                                        ref="product_category"
                                        id="product_category" />
                                    <FormFeedback>{this.state.categoryErrMess}</FormFeedback>
                                </FormGroup>
                                <div className="d-flex justify-content-end">
                                    <Button type="submit" className="mb-2" color="success" outline >Save Product</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default connect(mapPropsToState)(EditProduct);