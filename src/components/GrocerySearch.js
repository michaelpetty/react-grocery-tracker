import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import searchReducer from "../hooks/searchReducer"
import { Button, Card, Form, Modal, Search } from "semantic-ui-react"
import ProductModel from "../models/product"

const initState = {
    loading: false,
    results: [],
    value: ''
}

const GrocerySearch = ({addToReceipt}) => {
    const [state, dispatch] = useReducer(searchReducer, initState)
    const {loading, results, value} = state

    const timeoutRef = useRef()

    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({type: 'START_SEARCH', query: data.value})

        timeoutRef.current = setTimeout(async () => {
            if (data.value.length === 0) {
                dispatch({type: 'CLEAN_QUERY', initState})
                return
            }

            const searchResults = await ProductModel.searchByTitle(data.value)

            dispatch({
                type: 'FINISH_SEARCH',
                results: searchResults
            })

        }, 300);
    }, [])

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const handleAddToReceipt = (e, data) => {
        //TODO: user set quantity 
        addToReceipt({productId: data.id, quantity: data.quantity||1})
        dispatch({type: 'CLEAN_QUERY', initState})
    }

    const [open, setOpen] = useState(false)
    
    const CreateItemModal = ({name, handleAddToReceipt}) => {
        const [itemName, setItemName] = useState(name)
        const descrInput = useRef(null)
        const quantInput = useRef(0)
        const handleChange = (e, {value}) => {
            setItemName(value)
        }

        const addItemToDB = async () => {
            const prod = {
                name: itemName, 
                descr: descrInput.current.value
            }
            const newProd = await ProductModel.create(prod)
            return newProd
        }
        const handleAddToDBAndRec = async () => {
            const newProd = await addItemToDB()
            const po = {
                quantity: quantInput.current.value,
                id: newProd.id
            }
            handleAddToReceipt({}, po )
            setOpen(false)
        }
        
        const handleAddToDB = async () => {
            await addItemToDB()
            setOpen(false)

        }
        return (
            <Modal 
                onClose={() => setOpen(false)}
                open={open}
                size='mini'
            >
                <Modal.Header>Create new item</Modal.Header>
                <Modal.Content>
                    Item details:
                    <Form size='mini'>
                        <Form.Input id="form-input-name" label="Item name" required name="name" value={itemName} onChange={handleChange} />
                        <Form.Field>
                            <label htmlFor="form-textarea-descr">Description</label>
                            <textarea id="form-textarea-descr" rows="2" placeholder="Short description of item" ref={descrInput} />
                        </Form.Field> 
                    </Form>
                    Order details:
                    <Form size='mini'>
                        <Form.Field>
                            <label htmlFor="form-input-quantity">Quantity</label>
                            <input id="form-input-quantity" ref={quantInput} type='number' min='0' max='100' placeholder="Number 0-100"/>
                        </Form.Field> 
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon="database" content={'Add to DB'} compact onClick={handleAddToDB} />
                    <Button icon="list" content={'Add to DB and receipt'} compact onClick={handleAddToDBAndRec}/>
                </Modal.Actions>
            </Modal>
        )
    }
    const CreateItemButton = () => (
        <Button content="Create new item" onClick={() => setOpen(true)}/>
    )

    const resultRenderer = result => (
        <>
            <Card 
                header={result.title} 
                description={result.description} 
                key={`item-${result.id}`}
                extra={
                    <Button content='Add to this receipt' id={result.prodid} onClick={handleAddToReceipt} />
                }
                />
            {result.id === results.length-1 &&
            <CreateItemButton />
            }
        </>
    )

    return (
        <>
        <Search 
            loading={loading}
            placeholder='Enter item'
            onSearchChange={handleSearchChange}
            noResultsMessage={<CreateItemButton />}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
        />
        <CreateItemModal name={value} handleAddToReceipt={handleAddToReceipt}/>
        </>
    )
}

export default GrocerySearch