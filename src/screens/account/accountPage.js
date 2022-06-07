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

const MainContent = () => {
    const [displayBillingAdd, setDisplayBillingAdd] = useState(false);
    const [displayShippingAdd, setDisplayShippingAdd] = useState(false); 
    return (
        <OuterShell>
            <Shell>
                <ShippingForm />
            </Shell>
         </OuterShell>

    )
}