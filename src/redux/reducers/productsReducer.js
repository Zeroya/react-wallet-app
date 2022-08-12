import { ActionTypes } from "../constants/action-types";

const intialState = {
  products: [],
};

const SortState = {
  products: [],
};

const categoryState = {
  category: [],
};

const card = localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [];

export const cardsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CARDS:
      return { ...state, products:[...state.products , payload]  };
    default:
      return state;
  }
};

export const sortReducer = (state = SortState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SORT_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      const sort = payload.sort;
      if (sort === 'all'){ 
        return {}
      }
      return { ...state, category: payload.products.filter((item) => item.shop === sort ) };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const categoryReducer = (state = categoryState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CATEGORY_PRODUCTS:
      return { ...state, category: payload };
    default:
      return state;
  }
};


export const handleCard = (state = card, action) => {
  const product = action.payload;
  localStorage.setItem("cards", JSON.stringify(state));
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        return state.map((x) => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
      } else {
        const product = action.payload;
        return [...state, { ...product, qty: 1 }]
      }

    case ActionTypes.DELETE_ITEM:
      const exist1 = state.find((x) => x.id === product.id);
      if(exist1.qty === 1) {
        return state.filter((x) => x.id !== product.id);
      } else {
        return state.map((x) => x.id === product.id ? { ...x , qty: x.qty - 1} : x)
      }
    default:
      return state;
  }

};