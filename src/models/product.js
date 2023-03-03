import axios from "axios";

const apiUrl = process.env.REACT_APP_PRODUCT_API

class ProductModel {
    static create = async (prod) => {
        const response = await axios.post(`${apiUrl}/products`, prod)
        return response.data
    }
    static searchByTitle = async (query) => {
        const response = await axios.get(`${apiUrl}/products/search?title=${query}`)
        return response.data
    }
    static findById = async () => {

    }
    static updateById = async () => {

    }
}

export default ProductModel