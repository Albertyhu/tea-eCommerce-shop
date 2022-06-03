import React, { useState, useEffect } from 'react'; 
import { MyContext } from '../../../components/contextItem.js'; 
import {
    CTAPanelContainer,
    InnerContainer,
    SalesPrice, 
    StockSelection,
    StockSelectionElement,
    CustomStock,
    CustomStockInput,
    DarkGreenButton,
    GreenButton,
} from './profileStyledComp.js'; 
import {
    BrownButton,
    TanButton, 

} from '../../../style/styledButton.js'; 

const CTA = props => {
    const { addProduct, openAddProductMessage } = React.useContext(MyContext)
    const { shippingDays, productID, price } = props 
    const [quantity, setQuantity] = useState(1); 
    const [customQuan, setCustomQuan] = useState(0); 
    const [displayCustomStock, setDisplayCustomStock] = useState(false); 
    const [ subtotal, setSubtotal ] = useState(price)

    const handleStockChange = event => {
        setQuantity(event.target.value)
    }

    const handleCustomStock = event => {
        let regex = /[^0-9]/g
        var userInput = event.target.value.replace(regex, "");
        setCustomQuan(userInput)
    }

    const handleCustomSubmit = () => {
        setQuantity(customQuan);
        setDisplayCustomStock(false);
       // setCustomQuan(0);
    }

    const closeCustom = () => {
        setDisplayCustomStock(false);
        setCustomQuan(0);
        setQuantity(0);
    }

    useEffect(() => {
        if (quantity === "custom") { setDisplayCustomStock(true) }
        else
            setDisplayCustomStock(false)
        if (!isNaN(quantity) && quantity > 0) {
            setSubtotal(quantity * price)
        }
    }, [quantity])

    useEffect(() => {
        setSubtotal(price)
        setQuantity(1)
    }, [price])

    return (
        <CTAPanelContainer>
            <InnerContainer>
                <SalesPrice>${subtotal.toFixed(2)}</SalesPrice>
                <StockSelection>
                    <b style={{ display: 'inline-block' }}>Stock: </b>
                    <StockSelectionElement onChange={handleStockChange}  value={quantity}>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        {customQuan != 0 ? <option>{customQuan}</option> : null}
                        <option>custom</option>
                    </StockSelectionElement >
                </StockSelection>
                {displayCustomStock ? 
                    <CustomStock>
                        <b>Custom Amount: </b>
                        <CustomStockInput onChange={handleCustomStock} value={customQuan} />
                        <GreenButton onClick={handleCustomSubmit}>submit</GreenButton>
                        <DarkGreenButton onClick={closeCustom}>cancel</DarkGreenButton >
                    </CustomStock>
                    :
                    null
                }
            </InnerContainer>
        </CTAPanelContainer>
        )

}

export default CTA; 