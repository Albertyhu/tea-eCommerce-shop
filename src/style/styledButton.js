import styled from 'styled-components'

export const ShopNowButton = styled.div`
    margin-left: auto;
    margin-right: auto;
    border: 2px solid #ffffff;
    border-radius: 25px;
    padding: 10px;
    background - color: none;
    width: 10%;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    font-size: 20px;
    user-select: none;

&:hover{
    background-color: #ffffff;
    color: #333333; 
    transition-duration: 1s;
}

@media screen and (max-width: 540px){
    min-width: 100px
}
`

export const BrownButton = styled.div`
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    padding: 10px;
    background-color: #9D5F38;
    width: 20%;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    font-size: 25px;
    text-transform: uppercase;
    user-select: none;
&:active{
    background-color: #b8b8b8;
    transform: translate(4px, 4px)
}

&#CartPanEditButt{
    border-radius: 25px; 
    text-transform: none;
    width: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
&#ContinueButton{
    font-size: 20px; 
    border-radius: 15px;
    width: 80%;
    text-transform: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 20px;

}

`

export const TanButton = styled.div`
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    padding: 10px;
    background-color: #D19C4C;
    width: 20%;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    font-size: 25px;
    text-transform: uppercase;
    user-select: none;
&:active{
    background-color: #D19C4C;
    transform: translate(4px, 4px)
}
&:hover{
    background-color: #bc8d45;
}
&#ContinueButton{
    font-size: 20px; 
    border-radius: 15px;
    width: 80%;
    text-transform: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 20px;
}
&#ContinueToCheckoutButton{
    font-size: 20px; 
    border-radius: 15px;
    width: 80%;
    text-transform: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 20px;
}

&#CartPanCheckoutButt{
        border-radius: 25px; 
    text-transform: none;
    width: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; 
    
}


&#ContinueBrowsing{
        font-size: 20px; 
    border-radius: 15px;
    text-transform: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-top: 20px;
    padding: 5px;
    min-width: 300px;
    white-space: nowrap;
}

&#OrderReviewButton{
    font-size: 20px; 
    border-radius: 15px;
    text-transform: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-top: 20px;
    padding: 5px;
    min-width: 300px;
    white-space: nowrap;
}

`

export const DarkGreenButton = styled.div`
    margin-left: auto;
    margin-right: auto;
    border-radius: 25px;
    padding: 10px;
    background-color: #25963E;
    width: 10%;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    font-size: 25px;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

&:hover{
    background-color: #31B64E;
}

&:active{
    background-color: #25963E;
    transform: translate(4px, 4px)
}

@media screen and (max-width: 540px){
    width: 30%;
}

&#cartPanelButton{
    border-radius: 25px; 
    text-transform: none;
    width: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
&#ShippingSubmit{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 15px;
    padding: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

}
`
export const GreenButton = styled.div`
    margin-left: auto;
    margin-right: auto;
    border-radius: 25px;
    padding: 10px;
    background-color: #10C135;
    width: 10%;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    font-size: 25px;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

&:active{
    background-color: #b8b8b8;
    transform: translate(4px, 4px)
}

@media screen and (max-width: 540px){
    width: 30%;
}

&#addressChange{
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-size: 15px;
    padding: 5px;

}
`


export const WhiteButton = styled.div`
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    padding: 10px;
    background-color: #ffffff;
    width: 20%;
    text-align: center;
    color: #000000;
    cursor: pointer;
    text-decoration: none;
    font-size: 25px;
    text-transform: uppercase;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

&:active{
    background-color: #cbcbcb;
    transform: translate(4px, 4px)
}
&:hover{
    background-color: #ffffff;
}
`