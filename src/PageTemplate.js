import React, { useEffect, useState } from 'react'; 
import Header from './base_elements/header.js';
import Footer from './base_elements/footer.js';
import RenderPanels from './components/renderPanels.js';
import RenderMessage from './screens/product_page/addProductMessage/renderMessagePanel.js';
import { PageTemplateContext } from './components/pageTemplateContext.js'; 

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
    const [InnerContHeight, setInnerContHeight] = useState("100%");
    const [keepAuto, setKeepAuto] = useState(false)
    const [arrData, setArrData] = useState(null)
    const changeHeight = change => {
        setHeight(change)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const context = {

        //The following is to make sure that the footer stays in the right position by controlling the value of the height of <InnerContainer> 
        changeInnerContHeight: (val) => setInnerContHeight(val),
        setUnitForMeasure: data => { setArrData(data) },

        //makePageAuto is for screens that don't have a list but have elements that take up the full screen and can dynamically change the size of the screen.
        makePageAuto: () => { setKeepAuto(true)},
        }

    //The following code for context and useEffect block are to help determine the value of the height of the <InnerContainer>
    //This is to prevent the footer from being positioned in the middle of the screen.
    //If there are more than one items displayed on the screen, set height of <InnerContainer> to auto
    //...so that the last product at the bottom doesn't overlap the footer. 
    useEffect(() => {
        if (!keepAuto) {
            if (arrData !== null) {
                if (arrData.length > 1) {
                    setInnerContHeight("auto")
                }
                else {
                    console.log("set to false 1")
                    setInnerContHeight("100%")
                }
            }
            else {
                console.log("set to false 2 ")
                setInnerContHeight("100%")
            }
        }
        else {
            console.log("set to true ")
            setInnerContHeight("auto")
        }
    }, [keepAuto, arrData])

    return (
        <PageTemplateContext.Provider value = {context}>
        <MainContainer heightChange={height}>
                <InnerContainer heightType={InnerContHeight}>
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
        </PageTemplateContext.Provider>
        )
}

export default PageTemplate; 