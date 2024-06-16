import axios from 'axios';

export const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/products');
      console.log("Products from Actions",response.data)
      return response.data.products;
    } catch (error) {
      // Handle error
      console.error('Error fetching products:', error);
      return [];
    }
  };


  export const getAllSellers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/sellers');
      console.log("Sellerss from Actions",response.data)
      return response.data.sellers;
    } catch (error) {
      // Handle error
      console.error('Error fetching sellers:', error);
      return [];
    }
  };

  // import axios from 'axios';

  // // Action Types
  // const DELETE_SELLER_SUCCESS = 'DELETE_SELLER_SUCCESS';
  // const DELETE_SELLER_FAILURE = 'DELETE_SELLER_FAILURE';
  
  // // Action Creators
  // const deleteSellerSuccess = (sellerId) => ({
  //   type: DELETE_SELLER_SUCCESS,
  //   payload: sellerId,
  // });
  
  // const deleteSellerFailure = (error) => ({
  //   type: DELETE_SELLER_FAILURE,
  //   payload: error,
  // });
  
  // // Thunk Action for Deleting Seller
  // export const deleteSeller = (sellerId) => async (dispatch) => {
  //   try {
  //     await axios.delete(`http://localhost:8000/api/admin/seller/${sellerId}`, {
  //       withCredentials: true,
  //     });
  //     console.log("Seller deleted successfully", sellerId);
  //     dispatch(deleteSellerSuccess(sellerId));
  //   } catch (error) {
  //     console.error("Error deleting seller:", error);
  //     dispatch(deleteSellerFailure(error.message));
  //   }
  // };
  
  // // Initial State
  // const initialState = {
  //   sellers: [],
  //   error: null,
  // };
  
  // // Reducer
  // const sellerReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case DELETE_SELLER_SUCCESS:
  //       return {
  //         ...state,
  //         sellers: state.sellers.filter(seller => seller.id !== action.payload),
  //         error: null,
  //       };
  //     case DELETE_SELLER_FAILURE:
  //       return {
  //         ...state,
  //         error: action.payload,
  //       };
  //     default:
  //       return state;
  //   }
  // };
  
  // export default sellerReducer;


 export const deleteSeller = async (sellerId) => {
  try {
    await axios.delete(`http://localhost:8000/api/admin/seller/${sellerId}`, {
      withCredentials: true,
    });
    console.log("Seller deleted successfully", sellerId);
    return { success: true, sellerId };
  } catch (error) {
    console.error("Error deleting seller:", error);
    return { success: false, error: error.message };
  }
};


  

  export const getOrderList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/orders');
      console.log("Orders from Actions",response.data)
      return response.data.orders;
    } catch (error) {
      // Handle error
      console.error('Error fetching orders:', error);
      return [];
    }
  };