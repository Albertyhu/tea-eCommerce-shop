import React, { useEffect, useState, useCallback, useContext } from 'react'
import RenderList from '../checkout/renderList.js';  
import { TeaData } from '../../components/teaData.js'; 
import { RenderSubtotal } from '../../components/renderTotal.js';
import { useNavigate } from 'react-router-dom'; 
import PageTemplate from '../../PageTemplate.js'; 
import { PageTemplateContext } from '../../components/pageTemplateContext.js'; 
import { SecondInnerCont } from '../../style/globalStyledComp.js'; 

import uuid from 'react-uuid'; 
import {
    Title,
    CheckOutContainer,
    Shell, 
    OuterShell, 
} from './cartStyledComp.js'; 
import { TanButton, BrownButton } from '../../style/styledButton.js';

const RenderCartPage = props => {
    const {
        cart, 
        openHamburger,
        openPanel,
        accountPanel,
        addProductMessage,
    } = props;

    return (<PageTemplate MainContent={MainContent}
        openHamburger={openHamburger}
        openPanel={openPanel}
        accountPanel={accountPanel}
        addProductMessage={addProductMessage}
        cart={cart}
    />)
}

const MainContent = props => {
    const { 
        addProductMessage, 
        cart
    } = props;

    const { changeMessage, makePageAuto, makePageInherit  } = useContext(PageTemplateContext)
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
    const removeItem = prodID => {
        var arr = cartList.filter(val => val.ID !== prodID)
        setCartList(arr)
    }

    useEffect(() => {
        if (cartList.length > 0) {
            if (window.innerWidth > 540) {
                makePageInherit();
            }
            else
                makePageAuto();
        }
        else
            makePageInherit();
    }, [cart])


    const resizeEvent = e => {
        if (cartList.length > 0) {
            if (window.innerWidth > 540) {
                makePageInherit();
            }
            else
                makePageAuto();
        }
        else
            makePageInherit();
    }
    document.addEventListener('resize', resizeEvent);
    useEffect(() => {
 
        return () => { document.removeEventListener('resize', resizeEvent);}
    }, [])

    return (
            <SecondInnerCont>
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
            </SecondInnerCont>
        )
}

export default RenderCartPage; 