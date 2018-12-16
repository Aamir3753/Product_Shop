import React from 'react';
import { Form, Button, FormGroup, Label, Breadcrumb, BreadcrumbItem, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct } from '../redux/ActionCreaters';
class CreateProduct extends React.Component {
    state = {
        nameIsValid: false,
        nameIsInvalid: false,
        nameErrMess: "",

        descriptionIsValid: false,
        descriptionIsInvalid: false,
        descriptionErrMess: "",

        priceIsValid: false,
        priceIsInvalid: false,
        priceErrMess: "",

        categoryIsValid: false,
        categoryIsInvalid: false,
        categoryErrMess: ""
    }
    inputHandler = (event) => {
        let target = event.target;
        switch (target.id) {
            case "product_name":
                if (target.value.trim().length === 0) {
                    this.setState({ nameIsInvalid: true, nameErrMess: "Enter product name" })
                }
                else if (target.value.length > 15) {
                    this.setState({ nameIsInvalid: true, nameErrMess: "Name should be less than 15 characters" })
                }
                else if (target.value.length < 3) {
                    this.setState({ nameIsInvalid: true, nameErrMess: "Name should be greater than 3 characters" })
                }
                else {
                    this.setState({ nameIsValid: true, nameIsInvalid: false, nameErrMess: "" })
                }
                break;
            case "product_description":
                if (target.value.trim().length === 0) {
                    this.setState({ descriptionIsInvalid: true, descriptionErrMess: "Enter product description" })
                }
                else if (target.value.length > 20) {
                    this.setState({ descriptionIsInvalid: true, descriptionErrMess: "Description should be less than 30 characters" })
                }
                else if (target.value.length < 3) {
                    this.setState({ descriptionIsInvalid: true, descriptionErrMess: "Description should be greater than 3 characters" })
                }
                else {
                    this.setState({ descriptionIsValid: true, descriptionIsInvalid: false, descriptionErrMess: "" })
                }
                break;
            case "product_price":
                if (target.value.trim().length === 0) {
                    this.setState({ priceIsInvalid: true, priceErrMess: "Enter product price" })
                }
                else if (isNaN(Number(target.value))) {
                    this.setState({ priceIsInvalid: true, priceErrMess: "Enter valid price" })
                }
                else {
                    this.setState({ priceIsValid: true, priceIsInvalid: false, priceErrMess: "" })
                }
                break;
            case "product_category":
                if (target.value.trim().length === 0) {
                    this.setState({ categoryIsInvalid: true, categoryErrMess: "Enter product category" })
                }
                else if (target.value.length > 20) {
                    this.setState({ categoryIsInvalid: true, categoryErrMess: "Category should be less than 30 characters" })
                }
                else if (target.value.length < 3) {
                    this.setState({ categoryIsInvalid: true, categoryErrMess: "Category should be greater than 3 characters" })
                }
                else {
                    this.setState({ categoryIsValid: true, categoryIsInvalid: false, categoryErrMess: "" })
                }
                break;
            default:
                return
        }
    }
    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.nameIsValid && this.state.descriptionIsValid && this.state.priceIsValid && this.state.categoryIsValid) {
            this.props.dispatch(createProduct({
                name:document.getElementById("product_name").value,
                description: document.getElementById("product_description").value,
                price: document.getElementById("product_price").value,
                category: document.getElementById("product_category").value,
            }))
            this.props.history.push("/Product_Shop/home");
        }
        else {
            if (!this.state.nameIsValid) {
                this.setState({ nameErrMess: "Validate this field", nameIsInvalid: true })
                document.getElementById("product_name").focus()
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
                document.getElementById("product_category").focus();
            }
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/Product_Shop/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Create_Product</BreadcrumbItem>
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
                                    id="product_description" />
                                <FormFeedback>{this.state.descriptionErrMess}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="product_price">Price</Label>
                                <Input type="text" onInput={this.inputHandler}
                                    invalid={this.state.priceIsInvalid}
                                    valid={this.state.priceIsValid}
                                    ref="product_price"
                                    id="product_price" />
                                <FormFeedback>{this.state.priceErrMess}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="product_category">Category</Label>
                                <Input type="text" onInput={this.inputHandler}
                                    invalid={this.state.categoryIsInvalid}
                                    valid={this.state.categoryIsValid}
                                    ref="product_category"
                                    id="product_category" />
                                <FormFeedback>{this.state.categoryErrMess}</FormFeedback>
                            </FormGroup>
                            <div className="d-flex justify-content-end">
                                <Button type="submit" className="mb-2" color="success" outline >Create Product</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(CreateProduct);