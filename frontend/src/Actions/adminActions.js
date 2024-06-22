import axios from 'axios';

// Admin Dashboard

export const getCounts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/admin/count');
    console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error fetching:', error);
    return [];
  }
};

export const getBestSeller = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/admin/bestsellers');
    console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error fetching:', error);
    return [];
  }
};


// All Product

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

  export const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/product/${productId}`, {
        withCredentials: true,
      });
      console.log("Product deleted successfully", productId);
      return { success: true, productId };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, error: error.message };
    }
  };

  export const searchProducts = async (query) => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/product/search', {
        params: { query }
      });
      return response.data.products;
    } catch (error) {
      throw error;
    }
  };



  // Sellers

  export const getApprovedSellers = async () => {
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

  export const warnSeller = async (sellerId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/admin/warnseller/${sellerId}`);
      return response.data;
    } catch (error) {
      console.error('Error sending warning email:', error);
      throw error;
    }
  };


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

export const searchSellers = async ({ query, sellerId }) => {
  try {
    const response = await axios.get('http://localhost:8000/api/admin/seller/search', {
      params: { query, sellerId }
    });
    return response.data.sellers;
  } catch (error) {
    throw error;
  }
};




// Users

export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/admin/users');
    console.log("Users from Actions",response.data)
    console.log(response)
    return response.data.users;
  } catch (error) {
    // Handle error
    console.error('Error fetching users:', error);
    return [];
  }
};





// Order List

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


  

  //Seller Approval

  export const getSellers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/sellerstoapproval');
      console.log("Sellerss from Actions",response.data)
      return response.data.sellers;
    } catch (error) {
      // Handle error
      console.error('Error fetching sellers:', error);
      return [];
    }
  };


export const approveSeller = async (sellerId) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/admin/approveSeller/${sellerId}`);
    return response.data;
  } catch (error) {
    console.error("Error approving seller:", error);
    throw error;
  }
};

export const rejectSeller = async (sellerId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/admin/rejectSeller/${sellerId}`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting seller:", error);
    throw error;
  }
};



//Report Feedback

export const issueSelller = async() => {
  try{
    const response = await axios.get('http://localhost:8000/api/admin/issueseller');
    return response.data;
  }catch(error) {
    console.log ("Error fetching issue sellers:", error)
    return [];
  }
}