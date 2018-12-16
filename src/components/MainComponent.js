import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { getProducts } from '../redux/ActionCreaters';
import Home from './HomeComponent'
import { Header } from './HeaderComponent';
import CreateProduct from './CreateProductComponent';
import EditProduct from './EditProductComponent';
import ProductDetail from './ProductDetailComponent';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapPropsToState = (store) => ({
    products: store
})
class Main extends React.Component {
    componentDidMount() {
        this.props.dispatch(getProducts());
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <TransitionGroup>
                    <CSSTransition classNames="page" key={this.props.location.key} timeout={300}>
                        <Switch>
                            <Route exact path="/Product_Shop/home" component={Home} />
                            <Route exact path="/Product_Shop/createproduct" component={CreateProduct} />
                            <Route exact path="/Product_Shop/editproduct/:id" component={EditProduct} />
                            <Route path="/Product_Shop/productdetail/:id" component={ProductDetail} />
                            <Redirect to="/Product_Shop/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </React.Fragment>
        )
    }
}
export default withRouter(connect(mapPropsToState)(Main));