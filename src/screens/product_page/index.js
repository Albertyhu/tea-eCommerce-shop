import React, { useEffect, useState } from 'react'; 
import './product.css'; 
import '../../style/button.css';
import Header from '../../base_elements/header.js';
import Footer from '../../base_elements/footer.js';
import RenderCollection from './renderCollection.js'; 
import { TeaData } from '../../components/teaData.js'; 
import RenderMessage from './addProductMessage/renderMessagePanel.js';
import RenderPanels from '../../components/renderPanels.js'; 
import { ProductContext } from './productContext.js'; 
import { Filler } from '../../style/globalStyledComp.js'; 

const ProductPage = props => {
    const { openPanel, accountPanel, addProductMessage, openHamburger } = props; 

    //this is for the message that appears when product is added to cart or wishlist
    const [renderMessage, setMessage] = useState('')

    var count = Object.keys(TeaData).length;
    var windowWidth; 
    useEffect(() => {
        const mainContainer = document.getElementById("mainContainer");
        var heightMultiplier = Math.floor(Object.keys(TeaData).length / 3) + ((Object.keys(TeaData).length % 3) > 0 ? 1 : 0);
        const newHeight = 530 * heightMultiplier;
        mainContainer.style.height = `${newHeight}px`; 
    }, [])

    const context = {
        //this is for the message that appears when product is added to cart or wishlist
        changeMessage: (val) => { setMessage(val)}, 
    }

    return (
        <ProductContext.Provider value={context}>
            <div id="mainContainer">
                <div id='innerContainer'>
                    <RenderPanels
                        burgerTrigger={openHamburger}
                        cartTrigger={openPanel}
                        accountTrigger={accountPanel}
                    />
                    <RenderMessage addProductMessage={addProductMessage} message={renderMessage} />
                    <Header windowWidth={windowWidth} />
                    <Filler />
                    <div id="contentContainer">
                        <RenderCollection arrlength={count} />
                    </div>
                </div>
                <Footer />
            </div>
        </ProductContext.Provider>
        )
}

export default ProductPage; 