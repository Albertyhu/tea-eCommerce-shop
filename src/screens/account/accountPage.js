import React, {useState, useContext, useEffect, useCallback } from 'react'
import {
    OuterShell, 
    Title, 
    DetailTable, 
    TH
} from '../../style/globalStyledComp.js';
import { TanButton, BrownButton, DarkGreenButton, GreenButton } from '../../style/styledButton.js'; 
import RenderMessage from '../product_page/addProductMessage/renderMessagePanel.js';
import RenderPanels from '../../components/renderPanels.js'; 
import PageTemplate from '../../PageTemplate.js';
import ShippingForm from '../shipping/shippingForm.js'; 
import { MyContext } from '../../components/contextItem.js'; 

import { Shell, } from './accountStyledComponents.js'; 

const AccountPage = props => {

    const {
        openHamburger,
        openPanel,
        accountPanel,
        addProductMessage,
        message
    } = props; 
    return (
            <PageTemplate MainContent={MainContent}
                openHamburger={openHamburger} 
                openPanel={openPanel}
                accountPanel={accountPanel}
                addProductMessage={addProductMessage} 
                message={message}
            />
        )
} 

export default AccountPage; 

const MainContent = props => {
    const { getShippingAdd, setShippingAdd, getBillingAdd, setBillingAdd } = React.useContext(MyContext)
    const { changeHeight } = props; 
    const [displayBillingAdd, setDisplayBillingAdd] = useState(true);
    const [displayShippingAdd, setDisplayShippingAdd] = useState(true);
    const { innerWidth: width, innerHeight: height } = window;
    const webHeight = 100; 
    const mobileHeight = 120; 
    const [baseHeight, setBaseHeight] = useState(window.innerWidth > 540 ? webHeight : mobileHeight)
    //adjustedHeight is based on screen height changing based on changing size of the div's 
    const [adjustedHeight, setAdHeight] = useState(window.innerWidth > 540 ? webHeight : mobileHeight)
   // console.log("adjustedHeight: " + adjustedHeight)
    const [isMobile, setIsMobile] = useState(window.innerWidth > 540 ? false: true)
    const openEditBillingAdd = () => {
        setDisplayBillingAdd(false)
    }
    const closeEditBillingAdd = () => {
        setDisplayBillingAdd(true)
    }

    const openEditShippingAdd = () => {
        setDisplayShippingAdd(false)
    }
    const closeEditShippingAdd = () => {
        setDisplayShippingAdd(true)
    }

    const updateShipping = data => {
        setShippingAdd(data)
        setDisplayShippingAdd(true)
    }

    const updateBilling = data => {
        setBillingAdd(data)
        setDisplayBillingAdd(true);
    }
    //changeHeight(`${baseHeight}vh`)
   // console.log("window width = " + window.innerWidth)
   // console.log("ismobile: " + isMobile)

    useEffect(() => {
        const isItMobibile = () => {
            if (window.innerWidth <= 540)
                setIsMobile(true)
            else {
                setIsMobile(false)
            }
        }
        window.addEventListener('resize', isItMobibile);

        return () => { window.removeEventListener('resize', isItMobibile) }

    }, [])

    //mobile screens require larger height to display everything
    useEffect(() => {
        if (isMobile) {
            setAdHeight(mobileHeight)
        }
        else {
            setAdHeight(webHeight)
        }
        var newHeight = `${adjustedHeight}vh`; 
        changeHeight(newHeight)
    }, [isMobile])

    //function for adjusting the height of the main container of the screen when the size of div adjusts 
    const handleAdjustHeight = (boolVal) => {
        var newHeight = 0
        var addMobile = 15;
        var substractMobile = -15; 
        //If div contracts and is not mobile, subtract 25 from height 
        if (boolVal && !isMobile && adjustedHeight - newHeight > webHeight) {
            newHeight = -30;
        }
        else if (boolVal && isMobile && adjustedHeight - newHeight > mobileHeight) {
            newHeight = substractMobile;
        }
        //if div expands and is not mobile, add 30 to height
        if (!boolVal && !isMobile && adjustedHeight + newHeight < 160) {
            newHeight = 30;
        }
        else if (!boolVal && isMobile && adjustedHeight + newHeight < 190) {
            newHeight = addMobile ;
        }
        var oldHeight = adjustedHeight; 
        setAdHeight(oldHeight + newHeight)
    }

    //use effect is used for changing the value of adjustedHeight because it doesn't update right away
    useEffect(() => {
        console.log("adjusted height: " + adjustedHeight)
        changeHeight(`${adjustedHeight}vh`); 
    }, [adjustedHeight])

//if billing address is being edited and the pixels is needed to add to height of main container
    useEffect(() => {

        handleAdjustHeight(displayBillingAdd)
    }, [displayBillingAdd])

    useEffect(() => {
        handleAdjustHeight(displayShippingAdd)
    }, [displayShippingAdd])

    return (
        <OuterShell id="addressCont">
            {displayBillingAdd ? 
                <RenderAddress data={getBillingAdd()}
                    submitEvent={openEditBillingAdd}
                    title="Billing Address"
                /> 
                :
                <ShippingForm
                    submitEvent={updateBilling}
                    initialData={getBillingAdd()}
                    title="Billing Address"
                />
                }
            {displayShippingAdd ?
                <RenderAddress data={getShippingAdd()}
                    submitEvent={openEditShippingAdd}
                    title="Shipping Address"
                />
                :
                <ShippingForm
                    submitEvent={updateShipping}
                    initialData={getShippingAdd()}
                    title="Shipping Address"
                />
            }
         </OuterShell>

    )
}

export const RenderAddress = props => {
    const { data, submitEvent, title } = props; 
    return (
        <OuterShell id = "addressCont">
            <h1>{title}</h1> 
                <DetailTable id = "addressTable"><tbody>
                    <tr><TH>Address Line 1</TH><td>{data.address1}</td></tr>
                    <tr><TH>Address Line 2</TH><td>{data.address2}</td></tr>
                    <tr><TH>City</TH><td>{data.city}</td></tr>
                    <tr><TH>State</TH><td>{data.state}</td></tr>
                    <tr><TH>Zipcode</TH><td>{data.zipcode}</td></tr>
                    <tr><TH>country</TH><td>{data.country}</td></tr>
                </tbody></DetailTable>
                <GreenButton onClick={submitEvent} id = "addressChange">Update Info</GreenButton>
        </OuterShell>
        ) 
}