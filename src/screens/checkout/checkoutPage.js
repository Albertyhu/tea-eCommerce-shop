import React, { useEffect, useState, useCallback } from 'react'; 
import { TeaData } from '../../components/teaData.js'; 
import { RenderSubtotal } from '../../components/renderTotal.js';
import {
    Title,
    CheckOutContainer,
    Shell, 
    OuterShell,
    LoadingContainer, 
    CardElement, 
    InnerCardElements, 
    CreditCardInput, 
} from './checkoutStyle.js'; 
import { TanButton, BrownButton } from '../../style/styledButton.js';
import { MyContext } from '../../components/contextItem.js'; 
import { useNavigate, Link } from 'react-router-dom'; 
import RenderList from './renderList.js'; 
import uuid from 'react-uuid'; 
import { SecondInnerCont } from '../../style/globalStyledComp.js'
import PageTemplate from '../../PageTemplate.js'; 
import { PageTemplateContext } from '../../components/pageTemplateContext.js'; 
//requires props for data, submitEvent, title
import { RenderAddress } from '../account/accountPage.js';
import RenderShippingForm from '../shipping/shippingForm.js';
import styled from 'styled-components'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './stripe.css';
import axios from 'axios'; 
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";

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
    const { cart, changeHeight } = props; 
    const { getShippingAdd,
        setShippingAdd,
        getBillingAdd,
        setBillingAdd,
        setNewOrder,
        clearCart, 
    } = React.useContext(MyContext); 
    const [ checkoutList, setCheckout] = useState(null)
    const [editShipping, setEditShipping] = useState(false)
    const [editBilling, setEditBilling] = useState(false)
    const { makePageAuto } = React.useContext(PageTemplateContext)
    const [processingIndicator, setProcessingInd] = useState(false); 
    const [finalCost, ck_setFinalCost] = useState(0); 
    const [cardNum, setCardNum] = useState("")

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

    useEffect(() => {
        if (cart !== null && cart.length !== 0)
            makePageAuto()
    }, [cart])

    const OpenEditShippingDiv = () => {

        setEditShipping(true)

    }

    const UpdateShipping = newAdd => {
        setShippingAdd(newAdd)
        setEditShipping(false)
    }

    const OpenEditBillingDiv = () => {

        setEditBilling(true)

    }

    const UpdateBilling = newAdd => {
        setBillingAdd(newAdd)
        setEditBilling(false)
    }

    const goOrderCompletePage = useCallback(() => navigate('../order_summary', {replace: true}), [navigate])

    const confirmShipping = async (e) => {
        var shipping = getShippingAdd() 
        var isValid = true; 
        var errMessage = "Please, correct the following issues. \n "; 
        if (shipping.address1 === "") {
            errMessage += "Please, write your address on Address Line 1. \n"; 
            isValid = false; 
        }
        if (shipping.city === "") {
            errMessage += "Please, write down your city. \n";
            isValid = false;
        }
        if (shipping.zipcode === "") {
            errMessage += "Please, write down your zipcode. \n";
            isValid = false;
        }
        if (cardNum.length !== 31) {
            errMessage += "Please, complete your credit card info. \n";
            isValid = false;
        }
        else {
            if (!validateCreditMonth()) {
                errMessage += "The month of your card's expiration date is not correct. It needs to be in the range of 1 - 12. \n";
                isValid = false;
            }
            else {
                if (!validateCreditYear()) {
                    errMessage += "The date on your card has already expired. \n";
                    isValid = false;
                }
            }
        }
        if (isValid) {
            confirmOrder();
        }
        else {
            alert(errMessage)
        }

    };

    const validateCreditMonth = () => {
        var month = parseInt(cardNum.substring(20, 22)); 
        console.log("month = " + month)
        if (month < 1 || month > 12) {
            return false;
        }
        else
            return true; 
    }

    const validateCreditYear = () => {
        var isValid = true; 
        var month = parseInt(cardNum.substring(20, 22)); 
        var year = parseInt(cardNum.substring(23, 27))
        console.log("year = " + year)
        const current = new Date()
        const expDate = new Date(year, month - 1, 1)
        if (expDate < current)
            isValid = false;
        return isValid; 
    }

    const handleCreditInput = (event) => {
        var userInput = event;
        if (event.target.value.length < 32) {
            var formatted = formatCreditCardNum(userInput)
            setCardNum(formatted)
        }
    }
    //As the user types in their credit card numbers, this function formats it to the following 
    // xxxx\xxxx\xxxx\xxxx mm\yyyy cvv
    const formatCreditCardNum = (e) => {
        var raw = e.target.value;
        var regExp = /[^0-9]/g 
        var regExp2 = /\s/g
        var digitsOnly = raw.replace(regExp, "")
        var userInput = digitsOnly.replace(regExp2, "")

        var userLength = userInput.length;
        var formatted = '';
        if (userLength <= 4) {
            return `${userInput}`; 

        }
        if (userLength > 4 && userLength <= 8) {
            return `${userInput.slice(0, 4)}\\${userInput.slice(4)}`
        }
        if (userLength > 8 && userLength  < 13) {
            return `${userInput.slice(0, 4)}\\${userInput.slice(4, 8)}\\${userInput.slice(8)}`
        }
        if (userLength >= 13 && userLength < 17) {
            return`${userInput.slice(0, 4)}\\${userInput.slice(4, 8)}\\${userInput.slice(8, 12)}\\${userInput.slice(12, 16)}`
        }
        //month 
        if (userLength >= 17 && userLength < 19) {
            return `${userInput.slice(0, 4)}\\${userInput.slice(4, 8)}\\${userInput.slice(8, 12)}\\${userInput.slice(12, 16) + " "}${userInput.slice(16, 18)}`
        }
        //year
        if (userLength >= 19 && userLength < 23) {
            return `${userInput.slice(0, 4)}\\${userInput.slice(4, 8)}\\${userInput.slice(8, 12)}\\${userInput.slice(12, 16) + " "}${userInput.slice(16, 18)}\\${userInput.slice(18,22)}`
        }
        //cvv
        if (userLength >= 23 && userLength < 26) {
            return `${userInput.slice(0, 4)}\\${userInput.slice(4, 8)}\\${userInput.slice(8, 12)}\\${userInput.slice(12, 16) + " "}${userInput.slice(16, 18)}\\${userInput.slice(18, 22) + " "}${userInput.slice(22,25)}`

        }

    }

    const confirmOrder = () => {
            try {
       
                const amount_to_charge = (finalCost * 100).toFixed(0);
                var dateObj = new Date();
                var newOrder = {
             
                    cart,
                    amountPaid: finalCost,
                    orderDate: dateObj,
                }


                    setProcessingInd(false);
                    setNewOrder(newOrder);
                    goOrderCompletePage();
                    clearCart(); 
                
            } catch (e) { console.log("[ERROR]" + e) }
        


    }

    return (
        <SecondInnerCont opacityVal={processingIndicator ? 0.3 : 1.0 }>
            <h1>Checkout</h1>
            {checkoutList !== null && checkoutList.length !== 0 ?
                <OuterShell id = "checkout_outershell">
                    <Shell>
                        {!editShipping ?
                            <RenderAddress
                                data={getShippingAdd()}
                                submitEvent={OpenEditShippingDiv}
                                title="Shipping Address" />
                            :
                            <RenderShippingForm initialData={getShippingAdd()}
                                submitEvent={UpdateShipping}
                                title="Update Shipping Address" />
                        }
                        {!editBilling ? 
                            <RenderAddress
                                data={getBillingAdd()}
                                submitEvent={OpenEditBillingDiv}
                                title="Billing Address" />
                            :
                            <RenderShippingForm
                                initialData={getBillingAdd()}
                                submitEvent={UpdateBilling}
                                title="Update Billing Address" />
                        }
                    </Shell >
                    <Shell id = "rightPanel">
                            <CheckOutContainer>
                            <TanButton id="ContinueButton" onClick={(e) => confirmShipping(e)}>Place Order</TanButton>
                            <TermsAndCondStatement />
                            <RenderSubtotal shippingFee={5.99}
                                salesTax={7.75}
                                ck_setFinalCost={ck_setFinalCost}
                                isCheckout={true}
                            />
                            <h2>Card</h2>
                            <CardElement id ="CardElement">
                                <InnerCardElements id ="InnerCardElements">
                                    <CreditCardInput
                                        value={cardNum}
                                        type="text"
                                        placeholder="Credit Card Number  MM/YYYY  CVV"
                                        onChange={handleCreditInput}
                                        id = "CreditCardInput"
                                    />
                                </InnerCardElements>
                            </CardElement>
                            </CheckOutContainer>
                    </Shell>
                    {processingIndicator ?
                        <LoadingContainer>
                            <Bounce />
                        </LoadingContainer>
                        :
                        null
                            } 
                </OuterShell>
                :
            <Title>There are currently no items in your cart.</Title>
            }

        </SecondInnerCont>
        )
}

export default RenderCheckout; 


const RenderCheck = props => {

    const { checkoutList, refreshList, removeItem } = props
    return (
        <CheckOutContainer>
            {checkoutList.map(itm => <RenderList {...itm}
                key={uuid()}
                refreshList={refreshList}
                removeItem={removeItem}
            />)}
        </CheckOutContainer>
    )
}

const TermsAndCondStatement = () => {
return(<Terms>By placing this order, you agree to Earth Tone's <Link to="/privacy_policy" target="_blank">privacy policy</Link>.</Terms>)
}

const Terms = styled.div`
color: #575757; 
text-align: center; 
`

/*

const CARD_OPTIONS = {
    iconStyle: "solid",

    hidePostalCode: true,
    style: {
        base: {
            border: "1px solid rgba(0,0,0,05)",
            borderRadius: "15px",
            iconColor: "#c4f0ff",
            color: "#000",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}
*/
