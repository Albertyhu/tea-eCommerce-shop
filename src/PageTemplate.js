import React, { useEffect, useState } from 'react'; 
import Header from './base_elements/header.js';
import Footer from './base_elements/footer.js';
import RenderPanels from './components/renderPanels.js';
import RenderMessage from './screens/product_page/addProductMessage/renderMessagePanel.js';
import {
    MainContainer,
    InnerContainer,
    Filler, 
} from './style/globalStyledComp.js'; 

//This is the template for all pages that uses the same header and footer 
//The individual page's content is rendered in the <MainContent /> tag 
const PageTemplate = props => {
    const { MainContent,
        openHamburger, 
        openPanel,
        accountPanel,
        addProductMessage, 
        message,
        wishlist,
        cart, 
        //heightType dictates the height of the InnerContainer div
        //This is to help fix the issue of the footer being out of place. 
        //Some pages that have a fixed determined height should have a heightType of inherit
        //So the <InnerContainer< inherits the height of the parent div <MainContainer>
        //Some page that dynamically generated height should have a heightType of auto
        heightType, 
    } = props; 

    const [height, setHeight] = useState("100vh")

    const changeHeight = change => {
        setHeight(change)

    }

    useEffect(() => {
        console.log("height: " + height)
    }, [height])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <MainContainer heightChange={height}>
            <InnerContainer heightType={heightType}>
                <RenderPanels
                    burgerTrigger={openHamburger}
                    cartTrigger={openPanel}
                    accountTrigger={accountPanel}
                />
                <RenderMessage addProductMessage={addProductMessage} message={message} />
                <Header />
                <Filler />
                <MainContent wishlist={wishlist} changeHeight={changeHeight} cart={cart} />
            </InnerContainer>
            <Footer />
        </MainContainer>
        )
}

export default PageTemplate; 