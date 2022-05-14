import React, { useEffect } from 'react'; 
import './product.css'; 
import '../../style/button.css';
import Header from '../../base_elements/header.js';
import Footer from '../../base_elements/footer.js';
import RenderCollection from './renderCollection.js'; 
import { TeaData } from '../../components/teaData.js'; 
import CartPanel from '../cart/cartPanel.js'; 
import RenderMessage from './addProductMessage/renderMessagePanel.js';


const ProductPage = props => {
    const { openPanel, addProductMessage } = props; 
    var count = Object.keys(TeaData).length;
    useEffect(() => {
        const mainContainer = document.getElementById("mainContainer");
        var heightMultiplier = Math.floor(Object.keys(TeaData).length / 3) + ((Object.keys(TeaData).length % 3) > 0 ? 1 : 0);
        const newHeight = 600 * heightMultiplier;
        mainContainer.style.height = `${newHeight}px`;
    }, [])

    return (
        <div id="mainContainer">
            <div id='innerContainer'>
                <CartPanel openPanel={openPanel} />
                <RenderMessage addProductMessage={addProductMessage} message="Product has been added to your cart." />
                <Header />
                <div id="contentContainer">
                    <RenderCollection arrlength={count} />
                </div>
                <Footer />
            </div>
        </div>
        )
}

export default ProductPage; 