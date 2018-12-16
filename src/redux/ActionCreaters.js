import * as actionTypes from './ActionTypes';

export const getProducts = () => (dispatch) => {
    dispatch(loadingProductsAction());
    setTimeout(() => {
        let productDb = JSON.parse(localStorage.getItem("product_db"));
        if (productDb === null) {
            productDb = [];
            localStorage.setItem("product_db", JSON.stringify(productDb));
            return dispatch(displayProductsAction(productDb));
        }
        else {
            dispatch(displayProductsAction(productDb));
        }
    }, 3000);
}
export const createProduct = (product) => (dispatch) => {
    let productDb = JSON.parse(localStorage.getItem("product_db"));
    if (productDb === null) {
        productDb = [];
    }
    product.id = Math.random() * 1000000000000000000;
    product.date = new Date().toISOString();
    productDb.push(product)
    localStorage.setItem("product_db", JSON.stringify(productDb));
    return dispatch(addProductAction(product))
}
export const editProduct = (product) => (dispatch) => {
    let productDb = JSON.parse(localStorage.getItem("product_db"));
    productDb = productDb.map((prod) => {
        if (prod.id === product.id) {
            prod = product;
        }
        return prod
    })
    localStorage.setItem("product_db", JSON.stringify(productDb));
    dispatch(editProductAction(productDb))
}
export const delProduct = (productId) => (dispatch) => {
    let productDb = JSON.parse(localStorage.getItem("product_db"));
    productDb = productDb.filter((prod) => {

        return prod.id !== productId
    })
    localStorage.setItem("product_db", JSON.stringify(productDb));
    dispatch(delProductAction(productDb))
}
const loadingProductsAction = () => ({
    type: actionTypes.LOADING_PRODUCT
});
const displayProductsAction = (products) => ({
    type: actionTypes.DISPLAY_PRODUCTS_ALL,
    payload: products
})
const addProductAction = (product) => ({
    type: actionTypes.CREATE_PRODUCT,
    payload: product
})
const editProductAction = (products) => ({
    type: actionTypes.EDIT_PRODUCT,
    payload: products
})
const delProductAction = (products) => ({
    type: actionTypes.DELETE_PRODUCT,
    payload: products
})