import React, { useEffect, useState, useCallback } from 'react'; 
import Header from '../../base_elements/header.js';
import Footer from '../../base_elements/footer.js';
import { TeaData } from '../../components/teaData.js'; 
import RenderMessage from '../product_page/addProductMessage/renderMessagePanel.js';
import RenderPanels from '../../components/renderPanels.js'; 
import { RenderSubtotal } from '../../components/renderTotal.js';
import {
    MainContainer,
    InnerContainer,
    Title,
    CheckOutContainer,
    Shell, 
    OuterShell
} from './checkoutStyle.js'; 
import { TanButton, BrownButton } from '../../style/styledButton.js';
import { MyContext } from '../../components/contextItem.js'; 
import { Link } from 'react-router-dom'; 
import RenderList from './renderList.js'; 
import uuid from 'react-uuid'; 
import { useNavigate } from 'react-router-dom'; 

const RenderCheckOut = props => {
    const { cart, openHamburger, openPanel, accountPanel, addProductMessage } = props; 
    const { } = React.useContext(MyContext); 
    const [ checkoutList, setCheckout] = useState(null)

    const loadData = () => {
        if (cart) {
            var newArr = []
            cart.forEach(item => {
                var obj = TeaData.find(val => val.ID === item.ID)
                var checkoutItem = {
                    ID: obj.ID,
                    name: obj.name, 
                    description: obj.description,
                    price: obj.price,
                    amount: obj.amount,
                    image: obj.image,
                    imageArray: obj.imageArray, 
                    weight: obj.weight, 
                    width: obj.width,
                    length: obj.length,
                    height: obj.height,
                    shippingDays: obj.shippingDays, 
                    stock: item.stock, 
                }
                newArr.push(checkoutItem)
            })
            setCheckout(newArr)
        }
    }

    const refreshList = () => {
        setCheckout(null)
        loadData()
    }

    const removeItem = prodID => {
        var arr = checkoutList.filter(val => val.ID !== prodID)
        setCheckout(arr)
    }
    const navigate = useNavigate();
    const goCheckout = useCallback(() => navigate('../checkout', { replace: true }), [navigate])
    const goProductPage = useCallback(() => navigate('../product_page',
        { replace: true }), [navigate]) 

    useEffect(() => {
        loadData();
        return () => {setCheckout(null)}
    }, [])

    return (
        <MainContainer>
            <InnerContainer>
                <RenderPanels
                    burgerTrigger={openHamburger}
                    cartTrigger={openPanel}
                    accountTrigger={accountPanel}
                />
                <RenderMessage addProductMessage={addProductMessage} message="Product has been added to your cart." />
                <Header />
                <h1>Checkout</h1>
                {checkoutList !== null && checkoutList.length !== 0 ?
                    <OuterShell>
                       <Shell>
                            <CheckOutContainer>
                                    {checkoutList.map(itm => <RenderList {...itm}
                                        key={uuid()}
                                        refreshList={refreshList}
                                        removeItem={removeItem}
                                    />)}
                            </CheckOutContainer>
                        </Shell >
                        <Shell id = "rightPanel">
                                <CheckOutContainer>
                                <RenderSubtotal />
                                <TanButton id="ContinueButton">Proceed to Shipping</TanButton>
                                <BrownButton id="ContinueButton" onClick={goProductPage}>Continue Shopping</BrownButton>
                             </CheckOutContainer>
                        </Shell>
                    </OuterShell>
                    :
                <Title>There are currently no items in your cart.</Title>
                }
            </InnerContainer> 
            <Footer />
        </MainContainer>
        )
}

export default RenderCheckOut; 