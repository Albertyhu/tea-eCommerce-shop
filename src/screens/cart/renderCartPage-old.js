import React, { useEffect, useState, useCallback } from 'react'
import RenderList from '../checkout/renderList.js';  
import { TeaData } from '../../components/teaData.js'; 
import Header from '../../base_elements/header.js';
import Footer from '../../base_elements/footer.js';
import RenderMessage from '../product_page/addProductMessage/renderMessagePanel.js';
import RenderPanels from '../../components/renderPanels.js'; 
import { RenderSubtotal } from '../../components/renderTotal.js';
import { useNavigate } from 'react-router-dom'; 

import uuid from 'react-uuid'; 
import {
    MainContainer,
    InnerContainer,
    Title,
    CheckOutContainer,
    Shell, 
    OuterShell, 
} from './cartStyledComp.js'; 
import { TanButton, BrownButton } from '../../style/styledButton.js';
import { Filler } from '../../style/globalStyledComp.js'; 
const RenderCartPage = props => {
    const { cart,
        openHamburger,
        openPanel,
        accountPanel,
        addProductMessage
    } = props;
    const loadData = () => {
        var arr = []; 
        cart.forEach(val => {
            var obj = TeaData.find(tea => tea.ID === val.ID)
            arr.push({
                ID: obj.ID, 
                name: obj.name,
                description: obj.description,
                price: obj.price,
                amount: obj.amount,
                image: obj.image,
                imageArray: obj.imageArray, 
                width: obj.width,
                length: obj.length,
                height: obj.height,
                shippingDays: obj.shippingDays, 
                stock: val.stock, 
            })
        })
        return arr; 
    }
    const navigate = useNavigate(); 
    const goCheckout = useCallback(() => navigate('../checkout', {}), [navigate])
    const goProductPage = useCallback(() => navigate('../product_page',
        {}), [navigate]) 
    const [cartList, setCartList] = useState(loadData())
    const [innerContHeight, setInnerContHeight] = useState("inherit")
    const removeItem = prodID => {
        var arr = cartList.filter(val => val.ID !== prodID)
        setCartList(arr)
    }

    useEffect(() => {
        if (cartList.length > 1) {
            setInnerContHeight("auto")
        }
        else
            setInnerContHeight("inherit")
    }, [cart])

    return (
        <MainContainer>
            <InnerContainer heightType={innerContHeight}>
                <RenderPanels
                    burgerTrigger={openHamburger}
                    cartTrigger={openPanel}
                    accountTrigger={accountPanel}
                />
                <RenderMessage addProductMessage={addProductMessage} message="Product has been added to your cart." />
                <Header />
                <Filler />
                <h1>Shopping Cart</h1>
                {cartList !== null && cartList.length !== 0 ?
                    <OuterShell>
                        <Shell>
                        <CheckOutContainer> 
                            {cartList.map(val => <RenderList {...val}
                                key={uuid()}
                                removeItem={removeItem}
                            />)}
                        </CheckOutContainer> 
                        </Shell>
                        <Shell id="rightPanel">
                            <CheckOutContainer>
                                <RenderSubtotal isCheckout={false} />
                                <TanButton id="ContinueToCheckoutButton" onClick={goCheckout}>Continue to Checkout</TanButton>
                                <BrownButton id="ContinueButton" onClick={goProductPage}>Continue Shopping</BrownButton>
                            </CheckOutContainer>
                        </Shell>
                    </OuterShell>
                    :
                    <Title>Your shopping cart is currently empty</Title>
                }
            </InnerContainer>
            <Footer />
        </MainContainer>
        )
}

export default RenderCartPage; 