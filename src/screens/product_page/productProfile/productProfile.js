import React, { useEffect, useState, useCallback, useContext } from 'react';
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
import { TeaData } from '../../../components/teaData.js'; 
import { SecondInnerCont} from '../../../style/globalStyledComp.js';
import PageTemplate from '../../../PageTemplate.js'; 
import { PageTemplateContext } from '../../../components/pageTemplateContext.js'; 

const ProductProfile = props => {

    const {
        openHamburger,
        openPanel,
        accountPanel,
        addProductMessage,
    } = props;
    const location = useLocation(); 
    const {
        id,
    } = location.state;

    return (<PageTemplate MainContent={MainContent}
        openHamburger={openHamburger}
        openPanel={openPanel}
        accountPanel={accountPanel}
        addProductMessage={addProductMessage}
        ProductProfileID={id}
    />)
}

const MainContent = props => {

    const navigate = useNavigate(); 
    const goHome = useCallback(() => navigate('../tea-eCommerce-shop', { replace: true }), [navigate]);

    const { getProductID, makePageAuto, makePageInherit } = useContext(PageTemplateContext)
    const [productID, setProductID] = useState(getProductID()); 
    const { openPanel, accountPanel, addProductMessage, openHamburger } = props; 
    const [product, setProduct] = useState(TeaData.find(val => val.ID === productID))
    const [renderMessage, setMessage] = useState('')
    useEffect(() => {
        var item = TeaData.find(val => val.ID === productID)
        setProduct(item) 
    }, [productID])

    const handleMessage = val => {
        setMessage(val)
    }
    
    const changeHeight = () => {
        console.log('window.innerWidth: ' + window.innerWidth)
        if (window.innerWidth <= 540) {
            makePageAuto();
        }
        else {
            makePageInherit()
        }
    }
    /*
    useEffect(() => {
        changeHeight();
        window.addEventListener('resize', changeHeight)
        return () => {
            window.removeEventListener('resize', changeHeight); 
        }
    }, [])
    */
    return (
        <SecondInnerCont>
            {product ?
                <MainSection id="ProductProfile_mainSection">
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
                        ratingCount={product.ratingCount}
                        ratingAvg={product.ratingAvg}
                    />
                    <CTAPanel price={product.price}
                    productID={productID}
                        shippingDays={product.shippingDays}
                        setMessage={handleMessage}
                    />
                </MainSection > 
                :
                null
                }
        </SecondInnerCont>
        )
}

export default ProductProfile; 
