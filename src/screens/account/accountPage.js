import React, {useState, useContext, useEffect, useCallback } from 'react'
import {
    OuterShell, 
} from '../../style/globalStyledComp.js';
import RenderMessage from '../product_page/addProductMessage/renderMessagePanel.js';
import RenderPanels from '../../components/renderPanels.js'; 
import PageTemplate from '../../PageTemplate.js';
import ShippingForm from '../shipping/shippingForm.js'; 

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
        <div>
            <RenderPanels
                burgerTrigger={openHamburger}
                cartTrigger={openPanel}
                accountTrigger={accountPanel}
            />
            <RenderMessage addProductMessage={addProductMessage} message={message} />
            <PageTemplate MainContent={MainContent} />
        </div>
        )
} 

export default AccountPage; 

const MainContent = () => {
    return (
        <OuterShell>
            <Shell>
                <ShippingForm />
            </Shell>
         </OuterShell>

    )
}