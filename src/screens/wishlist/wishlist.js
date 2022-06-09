import React, { useState, useCallback, useEffect } from 'react'; 
import { TeaData } from '../../components/teaData.js';
import { MyContext } from '../../components/contextItem.js'; 
import uuid from 'react-uuid'; 
import RenderWishItem from './renderWishItem.js'; 
import PageTemplate from '../../PageTemplate.js';
import { useNavigate } from 'react-router-dom'; 
import { BrownButton } from '../../style/styledButton.js';
import {
    MainContainer,
    InnerContainer,
    Title,
    CheckOutContainer,
    Shell, 
    OuterShell
} from './wishStyled.js'; 

const RenderWishList = props => {
    const {
        wishlist,
        openHamburger,
        openPanel,
        accountPanel,
        addProductMessage,
        message
    } = props;

    const [innerContHeight, setInnerContHeight] = useState("inherit")

    useEffect(() => {
        if (wishlist.length > 1) {
            setInnerContHeight("auto")
        }
        else {
            setInnerContHeight("inherit")
        }
    }, [wishlist])

    return (<PageTemplate MainContent={MainContent}
        openHamburger={openHamburger}
        openPanel={openPanel}
        accountPanel={accountPanel}
        addProductMessage={addProductMessage}
        message={message}
        wishlist={wishlist}
        heightType={innerContHeight} 
        />)
}

const MainContent = (props) => {
    const { wishlist } = props; 
    const { removeWish} = React.useContext(MyContext); 
   
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

    const navigate = useNavigate(); 
    const goProductPage = useCallback(() => navigate('../product_page', { replace: true }), [navigate])

    return (<div id = "wishlistDiv">
    {
            wishlist.length !== 0 && wishlist !== null ?
                <OuterShell>
                    <Shell>
                        <h1>Wish List</h1>
                        {
                            data.map(val => <RenderWishItem {...val}
                                key={uuid()}
                                deleteWish={deleteWish}
                        />)}
                    </Shell>
                    <Shell id="rightPanel">
                        <CheckOutContainer>
                            <BrownButton id="ContinueButton" onClick={goProductPage}>Continue Shopping</BrownButton>
                        </CheckOutContainer>
                    </Shell>
                </OuterShell>
            :
            <Title>You have no items currently in your wish list</Title> 
        }

    </div>)    
}

export default RenderWishList; 