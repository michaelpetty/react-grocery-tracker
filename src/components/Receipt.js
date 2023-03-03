import { useEffect, useState } from "react";
import { Header, Icon, Item, Menu, Segment, Transition } from "semantic-ui-react";
import OrderModel from "../models/order";
import GrocerySearch from "./GrocerySearch";

const Receipt = ({id, showReceipts}) => {
    const [receipt, setReceipt] = useState({product_orders: []})

    const fetchData = async (orderId) => {
        const order = await OrderModel.show(orderId)
        setReceipt(order.data)
    }
    
    useEffect(() => {
        fetchData(id)
    }, [id])

    const prodItems = receipt.product_orders.map((po) => (
        <Item 
            header={po.product.name} 
            description={po.product.descr}
            meta={`Quantity: ${po.quantity}`} 
            key={`poItem-${po.productId}`} 
        />
    ))

    const addToReceipt = async ({productId, quantity}) => {
        const po = await OrderModel.addProdOrder({
            orderId: id, 
            productId, 
            quantity
        })
        await fetchData(id)
    }
    

    return (
        <Transition transitionOnMount={true} duration={1200} animation="fade left"><div>
            <Segment compact>
                <Menu size='mini' borderless >
                    <Menu.Item position="right" onClick={showReceipts}>
                        <Icon name="long arrow alternate left" />
                        All receipts
                    </Menu.Item>
                </Menu>
                {receipt.date && 
                    <>
                    <Header as="h2">Receipt for {new Date(receipt.date).toLocaleDateString()}</Header>
                    <GrocerySearch addToReceipt={addToReceipt}/>
                    <Item.Group divided>
                        {prodItems}
                    </Item.Group>
                    </>
                }
            </Segment>
        </div></Transition>
    )
}

export default Receipt