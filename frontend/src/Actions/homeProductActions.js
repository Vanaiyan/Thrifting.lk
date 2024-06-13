import axios from "axios";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../Reducers/productSlice";

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await axios.get("http://localhost:8000/api/products", {
      withCredentials: true,
    });
    dispatch(fetchProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};
