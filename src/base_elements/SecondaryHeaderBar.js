import React, { useState, useContext, useEffect, useCallback } from 'react'; 
import { Link } from 'react-router-dom'; 
import {
    HeaderTagLine,
    SecHeadBarCont,
    NonMemberTag,
    MemberTag,
    WelcomeTag,
    MobileSignInText, 
} from './headerStyle.js'; 
import { MyContext } from '../components/contextItem.js';
import { BsFilePersonFill, BsCartFill  } from 'react-icons/bs';
import HamburgerIcon from '../images/icon/hamburger_menu_white.png';
import { MobileMenuCont } from './headerStyle.js';
import { BsPersonSquare } from 'react-icons/bs';
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import EarthToneTextLogo from './logo/EarthToneTextLogoTan.png'; 
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'; 

const auth = getAuth() 


const SecondaryHeaderBar = props => {
    const [member, setMember] = useState(false)
    const [data, setData] = useState(null)
    const { getCurrentUser, openAccountPanel, openHamburgerPanel, toggleHamburgerPanel, getAuthToken } = useContext(MyContext); 
    const [isMobile, setIsMobile] = useState(window.innerWidth > 540 ? false : true)
    const handleOpenPanel = () => { openAccountPanel() }; 

    //determines if the app is being viewed on mobile or not. 
    const handleWindowResize = (event) => {
        if (window.innerWidth <= 540) {
            setIsMobile(true)
        }
        else {
            setIsMobile(false)
        }
    }


    useEffect(() => {
        if (getAuthToken()) {
            var newLogin = {
                first_name: localStorage.getItem("first_name"),
                last_name: localStorage.getItem("last_name"),

            }
            setMember(true)
            setData(newLogin)
        }
        else {
            setMember(false)
            setData(null)
        }
        window.addEventListener('resize', handleWindowResize)

        //The following code is necessary. The component needs to unmount for sliding panel to work
        return () => {

            window.removeEventListener('resize', handleWindowResize)
        } 
        
    }, [])


    const navigate = useNavigate(); 
    const goCart = useCallback(() => navigate('../cart', {}), [navigate])
    const goSignin = useCallback(() => navigate('../sign_in', {}), [navigate])
    const goSignup = useCallback(()=>navigate('../sign_up', {}), [navigate])
    const goHome = useCallback(() => navigate('../tea-eCommerce-shop', { replace: true }), [navigate])

    return (
        <div>{!isMobile ? 
        <SecHeadBarCont>
            {
                data ?
                    <WelcomeTag>Welcome, {data.first_name}</WelcomeTag>
                    :
                    null}
                   
            <HeaderTagLine>Orders of $50 or more will receive free shipping</HeaderTagLine>
            {
                member ?
                    <MemberTag onClick={handleOpenPanel}><BsFilePersonFill />Account</MemberTag>
                    :
                        <NonMemberTag><StyledLink onClick={goSignin}>Sign in</StyledLink>, or &#160;<StyledLink onClick={goSignup}> create a new account.</StyledLink></NonMemberTag>
            }
                    
        </SecHeadBarCont>
                : 
        <SecHeadBarCont>
            <MobileMenuCont>
                    <img src={HamburgerIcon} id="hamburgerIcon" onClick={toggleHamburgerPanel} />
                    <img src={EarthToneTextLogo} style={logoStyle} onClick={goHome} />
            </MobileMenuCont>
            <MobileMenuCont>
                    {member ? <BsPersonSquare style={iconStyle} onClick={handleOpenPanel} /> : <div id="SignIn" ><MobileSignInText>Sign In</MobileSignInText><BsPersonSquare style={iconStyle} onClick={goSignin} /></div> }
                    <BsCartFill style={iconStyle} onClick={goCart} />
            </MobileMenuCont>
         </SecHeadBarCont>
            }
    </div>)
}

const styledLink = {
    color: "#ffffff",
    fontWeight: "bold",
}

const StyledLink = styled.span`
    color: #ffffff;
    text-decoration: underline; 
    cursor: pointer; 

`


export default SecondaryHeaderBar; 

const iconStyle = {
    color: "#ffffff",
    width: "25px",
    height: "25px",
    marginRight: "10px",
    marginTop: "auto",
    marginBottom: 'auto',
    marginLeft: "10px",
}

const logoStyle = {
    width: "auto",
    height: "100%"
}

