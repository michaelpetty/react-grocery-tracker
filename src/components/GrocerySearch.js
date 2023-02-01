import axios from "axios"
import { useCallback, useEffect, useReducer, useRef } from "react"
import searchReducer from "../hooks/searchReducer"
import { Button, Card, Search } from "semantic-ui-react"

const initState = {
    loading: false,
    results: [],
    value: ''
}

const GrocerySearch = () => {
    const [state, dispatch] = useReducer(searchReducer, initState)
    const {loading, results, value} = state

    const timeoutRef = useRef()

    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({type: 'START_SEARCH', query: data.value})

        timeoutRef.current = setTimeout(async () => {
            if (data.value.length === 0) {
                dispatch({type: 'CLEAN_QUERY'})
                return
            }

            const {data: searchResults} = await axios.get(`http://localhost:4200/api/v1/products/search?title=${data.value}`)

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

    const resultRenderer = result => (
        <Card 
            header={result.title} 
            meta={result.prodid} 
            description={result.description} 
            extra={
                <Button content='Add to grocery list' id={result.prodid} onClick={(e, data) => console.log(data)} />
            }
        />
    )

    return (
        <Search 
            loading={loading}
            placeholder='Enter item'
            onResultSelect={(e, data) => dispatch({
                type: 'UPDATE_SELECTION',
                selection: data.result.title
            })}
            onSearchChange={handleSearchChange}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
        />
    )
}

export default GrocerySearch