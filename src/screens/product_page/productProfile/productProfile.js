import React, { useEffect, useState, useCallback } from 'react';
import '../product.css'; 
import '../../../style/button.css'; 
import RenderPanels from '../../../components/renderPanels.js'; 
import Footer from '../../../base_elements/footer.js';
import Header from '../../../base_elements/header.js';
import { useLocation, useNavigate } from 'react-router-dom';
import ImagePanel from './imagePanel.js'; 
import TextPanel from './textPanel.js'; 
import { MainSection } from './profileStyledComp.js';
import CTAPanel from './CTApanel.js'
import RenderMessage from '../addProductMessage/renderMessagePanel.js'; 
import { MyContext } from '../../../components/contextItem.js';
import { TeaData } from '../../../components/teaData.js'; 

const ProductProfile = props => {
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const goHome = useCallback(() => navigate('/tea-eCommerce-shop', { replace: true }), [navigate]);

    const {
        id,
    } = location.state;

    const { openPanel, accountPanel, addProductMessage, openHamburger } = props; 
    const [product, setProduct] = useState(TeaData.find(val => val.ID === id))
    useEffect(() => {

        var item = TeaData.find(val => val.ID === id)
        setProduct(item)
        
    }, [id])


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
                {product ?
                    <MainSection>
                        {product.imageArray.length > 0 ?
                            <ImagePanel imageArray={product.imageArray} initial={product.image} />
                            :
                            null
                        }
                        <TextPanel name={product.name}
                            description={product.description}
                            price={product.price}
                            amount={product.amount}
                            weight={product.weight}
                            width={product.width}
                            length={product.length}
                            height={product.height}
                        />
                        <CTAPanel price={product.price}
                            productID={id}
                            shippingDays={product.shippingDays}
                        />
                    </MainSection > 
                    :
                    null
                    }
            </div>
            <Footer />
        </div>
        )
}

export default ProductProfile; 
