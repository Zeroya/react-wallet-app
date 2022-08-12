import { ActionTypes } from "../constants/action-types";

export const setCards = (card) => {
  return {
    type: ActionTypes.SET_CARDS,
    payload: card,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const setCategoryProducts = (product) => {
  return {
    type: ActionTypes.SET_CATEGORY_PRODUCTS,
    payload: product,
  };
};

export const addToCard = (product) => {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: product,
  };
};

export const deleteFromCard = (product) => {
  return {
    type: ActionTypes.DELETE_ITEM,
    payload: product,
  };
};

export const sortProducts = (product) => {
  return {
    type: ActionTypes.SORT_PRODUCTS,
    payload: product,
  };
};

