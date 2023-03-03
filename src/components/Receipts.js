import { useEffect, useState } from "react"
import { Button, Header, Icon, Item, Segment, Transition } from "semantic-ui-react"
import OrderModel from "../models/order"

const Receipts = ({createReceipt, showReceipt}) => {
    const [receipts, setReceipts] = useState([])

    useEffect(() => {
        OrderModel.all()
            .then((res) => {
                setReceipts(res.data)
            })
    }, [])

    const items = receipts.map(rec => (
        <Item header={new Date(rec.date).toLocaleDateString()} key={`receipt-${rec.id}`} as='a' onClick={() => showReceipt(rec.id)}/>
        ))

    return (
        <Transition transitionOnMount={true} duration={1200} animation="fade left"><div>
            <Segment compact>
                <Button compact onClick={createReceipt}>
                    <Icon name='add circle' />NEW RECEIPT
                </Button>
                <Header as='h3'>Past Receipts</Header>
                <Item.Group>
                    {items}
                </Item.Group>
            </Segment>
        </div></Transition>
    )
}


export default Receipts