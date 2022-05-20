import React, { useEffect } from 'react'; 
import './product.css'; 
import '../../style/button.css';
import Header from '../../base_elements/header.js';
import Footer from '../../base_elements/footer.js';
import RenderCollection from './renderCollection.js'; 
import { TeaData } from '../../components/teaData.js'; 
import CartPanel from '../cart/cartPanel.js'; 
import RenderMessage from './addProductMessage/renderMessagePanel.js';
import HamburgerPanel from '../../base_elements/hamburgerPanel.js'; 

const ProductPage = props => {
    const { openPanel, addProductMessage, openHamburger } = props; 
    var count = Object.keys(TeaData).length;
    var windowWidth; 
    useEffect(() => {
        const mainContainer = document.getElementById("mainContainer");
        var heightMultiplier = Math.floor(Object.keys(TeaData).length / 3) + ((Object.keys(TeaData).length % 3) > 0 ? 1 : 0);
        const newHeight = 530 * heightMultiplier;
        mainContainer.style.height = `${newHeight}px`; 
    }, [])

    return (
        <div id="mainContainer">
            <div id='innerContainer'>
                <CartPanel openPanel={openPanel} />
                <HamburgerPanel openHamburger={openHamburger} />
                <RenderMessage addProductMessage={addProductMessage} message="Product has been added to your cart." />
                <Header windowWidth={windowWidth} />
                <div id="contentContainer">
                    <RenderCollection arrlength={count} />
                </div>
            </div>
            <Footer />
        </div>
        )
}

export default ProductPage; 