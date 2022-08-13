import { ActionTypes } from "../constants/action-types";

const intialState = {
  products: [],
  cash: []
};


export const cardsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CARDS:
      return { ...state, products: [...state.products, payload] };
    case ActionTypes.CARD_DELETE:
      return { ...state, products: state.products.filter((x) => x.number != payload.number) };
    case ActionTypes.ADD_CASH:
      const cashArray = [...state.cash, payload] ;
      const filteredByUAH = cashArray.filter((el) => el.currency.value === "UAH").reduce((total,acc) => total + Number(acc.amount), 0);
      const filteredByEUR = cashArray.filter((el) => el.currency.value === "EUR").reduce((total,acc) => total + Number(acc.amount), 0);
      const filteredByUSD = cashArray.filter((el) => el.currency.value === "USD").reduce((total,acc) => total + Number(acc.amount), 0);
      console.log({filteredByUAH,filteredByEUR, filteredByUSD });
      const cashObj = { ...state, cash: [
                      {amount:filteredByUAH , currency: {value:'UAH'}},
                      {amount:filteredByEUR , currency: {value:'EUR'}},
                      {amount:filteredByUSD , currency: {value:'USD'}} ] };
      return cashObj;
    default:
      return state;
  }
};
