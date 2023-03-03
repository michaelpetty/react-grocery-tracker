import { useState } from "react"
import Receipt from "../components/Receipt"
import Receipts from "../components/Receipts"
import OrderModel from "../models/order"

const ReceiptsContainer = () => {
    const [isReceipt, setIsReceipt] = useState(false)
    const [receiptId, setReceiptId] = useState()

    const createReceipt = async () => {
        const newReceipt = await OrderModel.create({date: new Date()})
        if (newReceipt.data.id) {
            setReceiptId(newReceipt.data.id)
            setIsReceipt(true)
        }
    }

    const showReceipt = (id) => {
        setReceiptId(id)
        setIsReceipt(true)
    }

    const showReceipts = () => setIsReceipt(false)

    return (
        <>
            {(isReceipt)? (
                <Receipt id={receiptId} showReceipts={showReceipts} />
            ): (
                <Receipts createReceipt={createReceipt} showReceipt={showReceipt}/>
            )}
        </>
    )
}

export default ReceiptsContainer