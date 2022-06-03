import React, { useEffect } from 'react';
import '../product.css'; 
import '../../../style/button.css'; 
import RenderPanels from '../../../components/renderPanels.js'; 
import { TeaData } from '../../../components/teaData.js'; 
import Footer from '../../../base_elements/footer.js';
import Header from '../../../base_elements/header.js';
import { useLocation } from 'react-router-dom';
import ImagePanel from './imagePanel.js'; 
import TextPanel from './textPanel.js'; 
import { MainSection } from './profileStyledComp.js';
import CTAPanel from './CTApanel.js'
import RenderMessage from '../addProductMessage/renderMessagePanel.js'; 
import { MyContext } from '../../../components/contextItem.js';

const ProductProfile = props => {
    const location = useLocation(); 
    const {
        id,
        name,
        image,
        description, 
        price,
        amount,
        imageArray,
        weight, 
        width,
        length,
        height,
        shippingDays, 
    } = location.state;
    const { openPanel, accountPanel, addProductMessage, openHamburger } = props; 



    return (
        <div id="mainContainer">
            <div id='innerContainer'>
                <RenderPanels
                    burgerTrigger={openHamburger}
                    cartTrigger={openPanel}
                    accountTrigger={accountPanel}
                />
                <RenderMessage addProductMessage={addProductMessage} message="Product has been added to your cart." />
                <Header />
                <MainSection>
                {imageArray.length > 0 ?       
                    <ImagePanel imageArray={imageArray} initial={image}/>
                    :
                    null
                }
                    <TextPanel name={name}
                        description={description}
                        price={price}
                        amount={amount}
                        weight={weight}
                        width={width}
                        length={length}
                        height={height}
                    />
                    <CTAPanel price={price}
                        productID={id}
                        shippingDays={shippingDays}
                    />
                </MainSection > 
            </div>
            <Footer />
        </div>
        )
}

export default ProductProfile; 

const imgStyle = {
    width: "100px", 
    height: "100px",
}