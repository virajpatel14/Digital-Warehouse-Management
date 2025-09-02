import axios from "axios";
import { base_url } from "../../utils/baseUrl"; // Adjust based on your actual path

// Fetch all removed products
const getAllAddedProduct = async () => {
    const response = await axios.get(`${base_url}productIn`);
    return response.data;
};

const iteminService = {
    getAllAddedProduct,
};

export default iteminService;