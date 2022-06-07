import React, { useEffect, useState } from 'react'; 
import Header from '../../base_elements/header.js';
import Footer from '../../base_elements/footer.js';
import { TeaData } from '../../components/teaData.js';
import RenderMessage from '../product_page/addProductMessage/renderMessagePanel.js';
import RenderPanels from '../../components/renderPanels.js'; 
import { MyContext } from '../../components/contextItem.js'; 
import uuid from 'react-uuid'; 
import RenderWishItem from './renderWishItem.js'; 

import {
    MainContainer,
    InnerContainer,
    Title,
    CheckOutContainer,
    Shell, 
    OuterShell
} from './wishStyled.js'; 

const RenderWishList = props => {
    const { wishlist,
        openHamburger,
        openPanel,
        accountPanel, 
        addProductMessage,
    } = props; 
    const { removeWish } = React.useContext(MyContext); 
    const LoadWishes = () => {
        var arr = TeaData.filter(val => {
            return wishlist.some(wish => wish === val.ID)
        })
        return arr; 
    }

    const [data, setData] = useState(LoadWishes()); 

    const deleteWish = (ProductID) => {
        var arr = data.filter(val => val.ID !== ProductID) 
        setData(arr)
        removeWish(ProductID);   
    }

    useEffect(() => { }, [])

    return (
    <MainContainer>
        <InnerContainer>
            <RenderPanels
                burgerTrigger={openHamburger}
                cartTrigger={openPanel}
                accountTrigger={accountPanel}
            />
            <RenderMessage addProductMessage={addProductMessage} message="Product has been added to your cart." />
                <Header />
                {wishlist ?
                    <Shell>
                    <h1>Wish List</h1>{
                            data.map(val => <RenderWishItem {...val}
                                key={uuid()}
                                deleteWish={deleteWish}
                        />)}
                    </Shell>
                    :
                    <Title>You have no items currently in your wish list</Title> 
                }
        </InnerContainer>
        <Footer />
        </MainContainer>
        )
}

export default RenderWishList; 