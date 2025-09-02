import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

// Fetch all products from the product collection
const getAllProduct = async () => {
    const response = await axios.get(`${base_url}transfer`, config);
    return response.data;
}

// Transfer a product to the inventory by productId
const transferProduct = async (productId) => {
    const response = await axios.post(`${base_url}transfer/${productId}`,{}, config);
    return response.data;
}

// Delete a product from the inventory by id
const deleteProduct = async (id) => {
    const response = await axios.delete(`${base_url}transfer/${id}`, config);
    return response.data;
}

const inventoryService = {
    getAllProduct,
    transferProduct,
    deleteProduct
}

export default inventoryService;
