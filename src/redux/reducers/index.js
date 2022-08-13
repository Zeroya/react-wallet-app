import { combineReducers } from "redux";
import { cardsReducer} from "./productsReducer";
const reducers = combineReducers({
  allProducts: cardsReducer,
});
export default reducers;
