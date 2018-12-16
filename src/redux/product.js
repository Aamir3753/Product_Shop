import * as actionTypes from './ActionTypes';
export const products = (state = {
    isLoading: true,
    products: [],
}, action) => {
    switch (action.type) {
        case actionTypes.DISPLAY_PRODUCTS_ALL:
            return { ...state, isLoading: false, products: action.payload };
        case actionTypes.CREATE_PRODUCT:
            state.products.push(action.payload);
            return state
        case actionTypes.EDIT_PRODUCT:
            return { ...state, products: action.payload }
        case actionTypes.DELETE_PRODUCT:
            return { ...state, products: action.payload }
        default:
            return state;
    }

}