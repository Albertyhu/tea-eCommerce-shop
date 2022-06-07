import React, { useEffect } from 'react'; 
import Header from './base_elements/header.js';
import Footer from './base_elements/footer.js';
import RenderPanels from './components/renderPanels.js';
import RenderMessage from './screens/product_page/addProductMessage/renderMessagePanel.js';
import {
    MainContainer,
    InnerContainer,
} from './style/globalStyledComp.js'; 

const PageTemplate = props => {
    const { MainContent,
        openHamburger, 
        openPanel,
        accountPanel,
        addProductMessage, 
        message,
        wishlist, 
    } = props; 
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <MainContainer>
            <InnerContainer>
                <RenderPanels
                    burgerTrigger={openHamburger}
                    cartTrigger={openPanel}
                    accountTrigger={accountPanel}
                />
                <RenderMessage addProductMessage={addProductMessage} message={message} />

                <Header />
                <MainContent wishlist={wishlist} />
            </InnerContainer>
            <Footer />
        </MainContainer>
        )
}

export default PageTemplate; 