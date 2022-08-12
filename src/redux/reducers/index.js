import { combineReducers } from "redux";
import { cardsReducer, selectedProductsReducer, categoryReducer, handleCard, sortReducer} from "./productsReducer";
const reducers = combineReducers({
  allProducts: cardsReducer,
  product: selectedProductsReducer,
  category: categoryReducer,
  handleCard,
  sortReducer
});
export default reducers;
