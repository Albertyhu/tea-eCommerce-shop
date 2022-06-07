import React, { useState, useContext, useCallback } from 'react'; 
import RenderStockSelection from '../../components/stockSelection.js'; 
import {
    ListItem,
    ListDetails, 
    Image, 
    Title, 
    DetailTable,
    TH, 
    SalesPrice, 
    SecondaryLinks,
    TDseparator,

} from './checkoutStyle.js'; 
import { MyContext } from '../../components/contextItem.js'; 
import { useNavigate } from 'react-router-dom'; 

const RenderList = props => {
    const { ID,
        name,
        description,
        price,
        amount,
        image,
        imageArray,
        weight,
        width,
        length,
        height,
        shippingDays,
        stock,
        refreshList, 
        removeItem, 
    } = props; 

    const [quantity, setQuan] = useState(stock); 
    const [customQuan, setCustomQuan] = useState(0); 
    const [displayCustomStock, setDisplayCustomStock] = useState(false);
    const { removeFromCart, setWish } = useContext(MyContext)
    const navigate = useNavigate(); 
    const handleCustomStock = event => {
        let regex = /[^0-9]/g
        var userInput = event.target.value.replace(regex, "");
        setCustomQuan(userInput)
    
    }

    const handleStockChange = event => {
        setQuan(event.target.value)
    }

    const handleCustomSubmit = () => {
        setQuan(customQuan);
        setDisplayCustomStock(false);
    }

    const moveToWishList = () => {
        removeItem(ID);   
        removeFromCart(ID);
        setWish(ID);
    }

    const goProductProfile = useCallback(() => navigate('../product_profile', {
        replace: true, 
        state: {
            id: ID, 
        }
    }), [navigate])



    return (
        <ListItem>
            <Image src={image} onClick={() => goProductProfile(ID)} />
            <DetailTable>
                <tbody>
                    <tr><th><Title>{name}</Title></th></tr>
                    <tr><TH>Price: </TH><td><SalesPrice>${price.toFixed(2)}</SalesPrice></td></tr>
                    <tr><TH>Quantity: </TH><td><RenderStockSelection
                        handleStockChange={handleStockChange}
                        quantity={quantity}
                        customQuan={customQuan}
                        displayCustomStock={displayCustomStock}
                        handleCustomStock={handleCustomStock}
                        setDisplayCustomStock={setDisplayCustomStock}
                        handleCustomSubmit={handleCustomSubmit}
                        setQuan={setQuan}
                    /></td><TDseparator><SecondaryLinks onClick={() => {
                            removeFromCart(ID);
                            removeItem(ID);
                        }}>Delete</SecondaryLinks></TDseparator><TDseparator><SecondaryLinks onClick={moveToWishList}>Save to Wishlist</SecondaryLinks></TDseparator></tr>
                </tbody>
            </DetailTable>
            
        </ListItem>
        )

 }

export default RenderList; 