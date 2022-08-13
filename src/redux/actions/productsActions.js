import { ActionTypes } from "../constants/action-types";

export const setCards = (card) => {
  return {
    type: ActionTypes.SET_CARDS,
    payload: card,
  };
};

export const cardDelete = (product) => {
  return {
    type: ActionTypes.CARD_DELETE,
    payload: product,
  };
};

export const addCash = (product) => {
  return {
    type: ActionTypes.ADD_CASH,
    payload: product,
  };
};




