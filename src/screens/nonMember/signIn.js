import React, {useState, useCallback, useEffect, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom"; 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import styled from 'styled-components'; 
import {
    InputField,
    InputContainer,
    InputDiv, 
    MainContainer,
    MainSignInContainer, 
    OuterShell,
    InnerShell,
    SubTitle,
    SubmitButton,
    Button2,
    ETLogoContainer, 
    ETLogo,
    NeedAccount, 
    LoadingContainer
} from './nonMemberStyles.js';
import '../../style/myStyle.css'; 
import Header from '../../base_elements/header.js';
import Footer from '../../base_elements/footer.js';
import { MyContext } from '../../components/contextItem.js';
import EarthToneLogo from '../../base_elements/logo/Earth Tone-black-transparent.png'
import { checkEmail } from './checkEmail.js';
import { ValidIcon, InvalidIcon } from './checkmarkIcon.js';
import { MdMailOutline } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai'; 
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import RenderPanels from '../../components/renderPanels.js'; 
import { genKey } from '../../components/randGen.js'; 

const SignIn = props => {
    const { openPanel, openHamburger, accountPanel } = props;
    const [email, setEmail] = useState(''); 
    const [validEmail, setValidEmail] = useState(false); 
    const [password, setPass] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate(); 
    const [opacityLevel, setOpacityLev] = useState(1)
    const { setCurrentUser} = useContext(MyContext); 

    const handleEmail = event => {
        setEmail(event.target.value); 
    }

    const handlePass = event => {
        setPass(event.target.value)
    }

    const handleSignIn = () => {
        var errMessage = "Please, correct the following: \n"; 
        var isValid = true; 
        if (!validEmail) {
            errMessage += "Email is not in the correct format. \n";
            isValid = false; 
        }
        if (password.length < 6) {
            errMessage += "Your password needs to be at at least 6 characters long. \n";
            isValid = false; 
        }

        if (localStorage.getItem("email") !== email) {
            errMessage += "The email address you typed in does not belong to any account. \n";
            isValid = false; 
        }

        if (localStorage.getItem("password" !== password)){
            errMessage += "The password you typed in does not match our records. \n";
            isValid = false; 
        }

        if (isValid) {
            setLoading(true)
            localStorage.setItem("authToken", genKey(5))
            setLoading(false)
            alert('You are now logged in. \n Welcome back.')
            goHome();
            setEmail('');
            setPass('');
        }
        else {
            alert(errMessage); 
            setLoading(false)
        }
    }

    const goSignUp = useCallback(() => navigate('/sign_up', {replace: true}), [navigate])
    const goHome = useCallback(() => navigate('/tea-eCommerce-shop', { replace: true }), [navigate])

    useEffect(() => {
        if (checkEmail(email)) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }

    }, [email])

    useEffect(() => {
        if (loading) {
            setOpacityLev(0.3)
        }
        else {
            setOpacityLev(1)
        }
    }, [loading])

    return (
        <MainSignInContainer>
            <RenderPanels
                burgerTrigger={openHamburger}
                cartTrigger={openPanel}
                accountTrigger={accountPanel}
            />
            <Header />
            <ETLogoContainer><ETLogo src={EarthToneLogo} /></ETLogoContainer>
            <OuterShell logo={EarthToneLogo}>
                <InnerShell opacity={opacityLevel}>
                <h1>Sign In</h1>
                <InputDiv>
                    <SubTitle>Email </SubTitle>
                        <InputContainer>
                            <MdMailOutline style={iconStyle} />
                        <InputField
                        value={email}
                        onChange={handleEmail}
                            />
                            {validEmail ? 
                                <ValidIcon />
                                :
                                <InvalidIcon />
                            }
                    </InputContainer>
                </InputDiv>
                <InputDiv>
                        <SubTitle>Password </SubTitle>
                        <InputContainer>
                            <AiOutlineLock style={iconStyle}/>
                        <InputField
                        value={password}
                        onChange={handlePass}
                            />
                            {password.trim().length >= 6 ?
                                <ValidIcon />
                                :
                                <InvalidIcon />
                            }
                        </InputContainer>
                        </InputDiv>
                    <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
                    <NeedAccount>Need to create an account with us?</NeedAccount>
                    <Button2 onClick={goSignUp}>Sign Up</Button2>
                </InnerShell>
                {loading ? 
                    <LoadingContainer>
                        <Bounce />
                    </LoadingContainer>
                    :
                    null
                }

            </OuterShell>
            <Footer />
        </MainSignInContainer>
        )
}

export default SignIn; 


const iconStyle = {
    height: "20px",
    width: "20px",
    padding: "5px",
}