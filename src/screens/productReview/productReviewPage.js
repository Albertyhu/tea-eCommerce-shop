import React, { useState, useCallback, useEffect, useContext } from 'react'
import PageTemplate from '../../PageTemplate.js';
import { PageTemplateContext } from '../../components/pageTemplateContext.js'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import { TeaData } from '../../components/teaData.js'; 
import { SecondInnerCont } from '../../style/globalStyledComp.js'; 
import styled from 'styled-components'; 
import { GreenButton, DarkGreenButton } from '../../style/styledButton.js'; 
import { BsStar, BsStarFill } from 'react-icons/bs';
import RenderRatingInput from '../../components/rating/renderRatingInput.js'; 

const RenderProductReviewPage = props => {
    const {
        openHamburger,
        openPanel,
        accountPanel,
        addProductMessage,
    } = props;
    const location = useLocation(); 
    const { productID } = location.state; 

    return (<PageTemplate MainContent={MainContent}
        openHamburger={openHamburger}
        openPanel={openPanel}
        accountPanel={accountPanel}
        addProductMessage={addProductMessage}
        ProductProfileID={productID}
    />)
}

export default RenderProductReviewPage; 

const MainContent = props => {
    const { getProductID, makePageAuto } = useContext(PageTemplateContext); 
    const [productID, setProductID] = useState(getProductID()); 
    const [product, setProduct] = useState({}); 
    const [productReview, setProductReview] = useState('')
    useEffect(() => {
        setProduct(TeaData.find(val => val.ID === productID)); 
    }, [productID])

    const handleInput = event => {
        setProductReview(event.target.value); 
    }

    useEffect(() => {
        makePageAuto();
    }, [])

    return (
        <SecondInnerCont>
            <ProductContainer> 
                <h1>Share your thoughts and experience about this product.</h1>
                <h2>{product.name}</h2>
                <Image src={product.image} />
                <RenderRatingInput />
            </ProductContainer> 
            <Textbox autocorrect="on"
                placeholder="Say something"
                onChange={handleInput}
                cols="150"
                rows="5"
            />
            <ButtonContainer>
                <GreenButton>Submit</GreenButton>
                <DarkGreenButton>Cancel</DarkGreenButton>
            </ButtonContainer>
        </SecondInnerCont>
        )
}


const ProductContainer = styled.div`
    text-align: center; 
`

const Image = styled.img`
width: 200px; 
height: 200px; 
`

const Textbox = styled.textarea`
    margin-top: 30px; 
margin-left: auto;
margin-right: auto;
font-family: inherit;
padding:10px; 
resize: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

`
const ButtonContainer = styled.div`
display: flex; 
width: 80%; 
margin-left: auto;
margin-right: auto;
margin-top: 30px; 
`