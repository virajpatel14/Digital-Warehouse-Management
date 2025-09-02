import axios from "axios"
import { config } from "../../utils/axiosConfig"
import { base_url } from "../../utils/baseUrl"

const getProducts = async () => {
    const response = await axios.get(`${base_url}product`, config)

    return response.data
}

const createProduct = async (productData) => {
    console.log(productData);
    const response = await axios.post(`${base_url}product`, productData, config,  {
        headers: {
            'Content-Type': 'multipart/form-data',  
        },
    })

    return response.data
}

const deleteProduct = async (id) => {
    console.log(id);
    const response = await axios.delete(`${base_url}product/${id}`, config)

    return response.data
}

const updateProduct = async (id, productData) => {
    try {
      console.log(id.productId);
      const response = await axios.put(`${base_url}product/${id.productId}`, id.productData, config, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error; // Propagate the error back
    }
  };

  const getOneProduct = async (id) => {
    console.log(id);
    const response = await axios.get(`${base_url}product/${id}`, config)

    return response.data
}

const getOneProductById = async (id) => {
  console.log(id);
  const response = await axios.get(`${base_url}product/${id}`, config)

  return response.data
}
const productService = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getOneProduct,
    getOneProductById
}

export default productService