import axios from "axios"

const apiUrl = `${process.env.REACT_APP_PRODUCT_API}/products`

class OrderModel {
    static all = async () => {
        const response = await axios.get(`${apiUrl}/orders`)
        return response
    }
    static show = async (orderId) => {
        const response = await axios.get(`${apiUrl}/orders/${orderId}`)
        return response
    }
    static create = async (order) => {
        const response = await axios.post(`${apiUrl}/orders`, order)
        return response
    }
    static addProdOrder = async (po) => {
        const response = await axios.post(`${apiUrl}/orders/${po.orderId}/po`, po)
        return response
    }
    static delete = async (orderId) => {axios.post(`${apiUrl}/orders`)

    }

}

export default OrderModel