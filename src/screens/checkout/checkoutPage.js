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
import { useNavigate } from 'react-router-dom'; 
import RenderList from './renderList.js'; 
import uuid from 'react-uuid'; 
import { SecondInnerCont } from '../../style/globalStyledComp.js'
import PageTemplate from '../../PageTemplate.js'; 

//requires props for data, submitEvent, title
import { RenderAddress } from '../account/accountPage.js';

//displays shipping information
//displays order summary 
//displays Stripe 
//displays list of items in cart and allows ability to change quantity

const RenderCheckout = props => {
    const {cart, openHamburger, openPanel, accountPanel, addProductMessage, message} = props;
    const [innerContHeight, setInnerContHeight] = useState("inherit")

    useEffect(() => {
        if (cart.length > 1) {
            setInnerContHeight("auto")
        }
        else {
            setInnerContHeight("inherit")
        }
    }, [cart])

    return (<PageTemplate MainContent={MainContent}
        openHamburger={openHamburger}
        openPanel={openPanel}
        accountPanel={accountPanel}
        addProductMessage={addProductMessage}
        message={message}
        heightType={innerContHeight}
        cart={cart}
    />)

}

const MainContent = props => {
    const { cart } = props; 
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
    const goProductPage = useCallback(() => navigate('../product_page',
        { replace: true }), [navigate]) 

    useEffect(() => {
        loadData();
        return () => {setCheckout(null)}
    }, [])

    return (
        <SecondInnerCont>
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

        </SecondInnerCont>
        )
}

export default RenderCheckout; 