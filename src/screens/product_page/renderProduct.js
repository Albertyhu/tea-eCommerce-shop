import React, { useEffect, useState } from 'react'; 
import './product.css';
import '../../style/button.css'; 
import uuid from 'react-uuid'; 
import { MyContext } from '../../components/contextItem.js'; 
import RenderMessage from './addProductMessage/renderMessagePanel.js'; 
//What does it need
//Product ID
//Product Image 
//Product Price 
//Product Details 
//Product title 
const RenderProduct = props => {
    const { image, name, price, description, ID, amount } = props
    const { addProduct, openAddProductMessage } = React.useContext(MyContext)
    const [stockPurchase, setStock] = useState(0); 
    const [customStock, setCustomStock] = useState(0)
    const [displayCustomStock, setDisplayCustomStock] = useState(false); 
    const handleStockChange = event => {
        setStock(event.target.value)
    }

    const handleCustomStock = event => {
        let regex = /[^0-9]/g
        var userInput = event.target.value.replace(regex, ""); 
        setCustomStock(userInput)
    }

    const closeCustom = () => {
        setDisplayCustomStock(false);
        setCustomStock(0);
        setStock(0);
    }

    useEffect(() => {
        if (stockPurchase === "custom") { setDisplayCustomStock(true) }
        else
            setDisplayCustomStock(false) 
    }, [stockPurchase])

    const handleAddCart = () => {
        var trueStock = 0; 
        if (displayCustomStock) {
            trueStock = customStock;
        }
        else {
            trueStock = stockPurchase; 
        }
        if (trueStock !== 0) {
            var product = {
                ID,
                name,
                description,
                price,
                amount,
                image,
                stock: parseInt(trueStock),
            }
            addProduct(product, ID, parseInt(trueStock))
            openAddProductMessage();
            reset();
        }
        else {
   
        }
    }

    const reset = () => {
        setStock(0);
        setCustomStock(0);
        setDisplayCustomStock(false);
    }

    return (
        <div className="productDiv" >
            <img src={image} id="productImage" />
            <h3>{name}</h3>
            <div className="descriptionArea">{description}</div>
            <div><b>Amount Per Bag:</b>  {amount} oz.</div>
            <div className = "price"><b>${price.toFixed(2)}</b></div>
            <div id="stockSelection">
                <b style={{display: 'inline-block'}}>Bags to buy: </b>
                <select onChange={handleStockChange} id="stockSelectionElement" value={stockPurchase}>
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
                    <option>custom</option>
                </select>
            </div>
            <div id="customStock">
                {
                    displayCustomStock ?
                        <div>
                            <b>Custom Amount: </b>
                            <input onChange={handleCustomStock} value={customStock} id="customStockInput" />
                            <div id="cancelButton" onClick={closeCustom}>Cancel</div>
                        </div>
                        :
                        null
                }
            </div>
            <div className="AddCartButton" onClick={handleAddCart}>Add to cart</div>
        </div>
        )
}

export default RenderProduct; 