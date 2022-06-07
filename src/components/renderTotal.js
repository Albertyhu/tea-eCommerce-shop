import React, {useState, useContext, useEffect} from 'react'
import { MyContext } from './contextItem.js'; 
import styled from 'styled-components'; 

export const RenderSubtotal= props => {
    const { calculateTotalCost, calculateTotalItems } = useContext(MyContext); 
    const [totalItems, setTotalItems] = useState(calculateTotalItems())
    const [subtotal, setSubtotal] = useState(calculateTotalCost())
    const { changeTotal } = props; 
    const recalculate = () => {
        setTotalItems(calculateTotalItems())
        setSubtotal(calculateTotalCost())
    }

    useEffect(() => {
        recalculate(); 
    }, [changeTotal])

    return (
        <Container>
            <Detail><b>Total items:</b> {totalItems}</Detail>
            <Detail><b>Subtotal before shipping and tax:</b> ${subtotal.toFixed(2)}</Detail> 
        </Container>
    )
}

const Container = styled.div`
    margin-left: auto;
    margin-right: auto; 
    margin-bottom: 20px;
`

const Detail = styled.div`

`
