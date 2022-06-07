import React from 'react'; 
import Header from './base_elements/header.js';
import Footer from './base_elements/footer.js';
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
        message
    } = props; 
    return (
        <MainContainer>
            <InnerContainer>
                <Header />
                <MainContent />
            </InnerContainer>
            <Footer />
        </MainContainer>
        )
}

export default PageTemplate; 