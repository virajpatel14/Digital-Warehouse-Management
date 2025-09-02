import axios from "axios";
import { base_url } from "../../utils/baseUrl"; // Adjust based on your actual path

// Fetch all removed products
const getAllRemovedProduct = async () => {
    const response = await axios.get(`${base_url}productOut`);
    return response.data;
};

const itemService = {
    getAllRemovedProduct,
};

export default itemService;
