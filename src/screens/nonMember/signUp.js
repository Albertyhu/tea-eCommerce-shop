import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    OuterShell,
    InnerShell,
    SubmitButton,
    Button2,
    LoadingContainer, 
} from './nonMemberStyles.js';
import {
    InputField,
    InputDiv,
    InputContainer, 
    SubTitle,
    MainContainer,
} from './SignUpStyle.js'; 
import '../../style/myStyle.css';
import Header from '../../base_elements/header.js';
import Footer from '../../base_elements/footer.js';
import { MyContext } from '../../components/contextItem.js';
import { ValidIcon, InvalidIcon } from './checkmarkIcon.js';
import { checkEmail } from './checkEmail.js'
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import RenderPanels from '../../components/renderPanels.js'; 
import styled from 'styled-components'; 
import { GenUserID } from './genUserID.js'; 
import { genKey } from '../../components/randGen.js';

//firebase 
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import firebase from 'firebase/compat/app'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/initializeFirebase.js';

const auth = getAuth(); 

const SignUp = props => {
    const { openPanel, openHamburger, accountPanel } = props;
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [userEmail, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false); 
    const [password, setPass] = useState('');
    const [validPasswordLength, setValidPasswordLength] = useState(false)
    const [confirmPass, setConfirm] = useState('');
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false); 
    const [loading, setLoading] = useState(false); 
    const [opacityLevel, setOpacityLev] = useState(1); 
    const navigate = useNavigate(); 
    const [termsConfirm, setTermsConfirm] = useState(false); 
    const [subscribe, setSubscribe] = useState(false)
    const { setCurrentUser } = useContext(MyContext); 

    const handleFirst = event => {
        setFirst(event.target.value)
    }

    const handleLast = event => {
        setLast(event.target.value)
    }

    const handleEmail = event => {
        setEmail(event.target.value);
    }

    const handlePass = event => {
        setPass(event.target.value)
    }

    const handleConfirmPass = event => {
        setConfirm(event.target.value)
    }

    const reset = ()  => {
        setFirst('');
        setLast('');
        setEmail('');
        setPass('');
        setConfirm('');
    }

    const handleSubmit = () => {
        var errorMessage = 'Unsuccessful submission. Please, correct the following: \n' 
        var isValid = true; 
        if (first === '') {
            errorMessage += 'Your first name has not been typed. \n'; 
            isValid = false; 
        }
        if (last === '') {
            errorMessage += 'Your last name has not been typed. \n';
            isValid = false;
        }
        if (userEmail === '') {
            errorMessage += 'Your email has not been typed. \n';
            isValid = false;
        }
        else if (!validEmail) {
            errorMessage += 'Your email needs to be in the correct format [For example: name@gmail.com]. \n';
            isValid = false;
        }
        if (localStorage.getItem("email") === userEmail) {
            errorMessage += 'The current email you wrote down is already in use. Please, use another one. \n';
            isValid = false;
        }
        if (password === '') {
            errorMessage += 'Your password has not been typed. \n';
            isValid = false;
        }
        if (!isPasswordConfirmed) {
            errorMessage += 'Both of your passwords need to match. \n';
            isValid = false;
        }
        if (!termsConfirm) {
            errorMessage += 'You must agree to our Terms and Condition \n';
            isValid = false;
        }

        if (isValid) {
            setLoading(true)
            try {
                localStorage.setItem("email", userEmail);
                localStorage.setItem("userID", GenUserID());
                localStorage.setItem("first_name", first);
                localStorage.setItem("last_name", last);
                localStorage.setItem("password", password);
                localStorage.setItem("authToken", genKey(5))
                reset(); 
                setLoading(false)
                alert("Your account has been created.");
                goHome();
            } catch (e) {
                setLoading(false)
                console.log(e.message)
            }
        }
        else {
            alert(errorMessage)
            setLoading(false)
        }
    }

    const goSignIn = useCallback(() => navigate('/sign_in', { replace: true }), [navigate]);
    const goHome = useCallback(() => navigate('/tea-eCommerce-shop', { replace: true }), [navigate]);

    useEffect(() => {
        if (password.trim().length >= 6) {
            setValidPasswordLength(true)
        }
        else {
            setValidPasswordLength(false)
        }
    }, [password])

    useEffect(() => {
        if (checkEmail(userEmail)) {
            setValidEmail(true);
        }
        else {
            setValidEmail(false)
        }
    }, [userEmail])

    useEffect(() => {
        if (confirmPass.trim().length != 0 && confirmPass.trim() === password.trim()) {
            setIsPasswordConfirmed(true)
        }
        else {
            setIsPasswordConfirmed(false)
        }
    }, [confirmPass])

    const toggleTerms = () => {
        setTermsConfirm(!termsConfirm)
    }

    const toggleSubscription = () => {
        setSubscribe(!subscribe)
    }

    const RenderTermsPanel = () => {
        return (
            <CheckInputCont><Check type="checkbox" checked={termsConfirm} onChange={toggleTerms} />By signing up, you agree to our <TermsSpan onClick={() => window.open('../terms_and_condition', '_blank')}>Terms and Conditions</TermsSpan></CheckInputCont>
            )
    }

    const SubscriptionRequest = () => {
        return (
            <CheckInputCont><Check type="checkbox" checked={subscribe} onChange={toggleSubscription} />Subscribe to our newsletter to get updates about our latest offers and deals.</CheckInputCont>
        )
    }

    useEffect(() => {
        if (loading) {
            setOpacityLev(0.3)
        }
        else {
            setOpacityLev(1)
        }
    }, [loading])

    return (
        <MainContainer>
            <RenderPanels
                burgerTrigger={openHamburger}
                cartTrigger={openPanel}
                accountTrigger={accountPanel}
            />
            <Header />
            <OuterShell>
                <InnerShell opacity={setOpacityLev}>
                        <h1>Create a New Account</h1>

                        <InputDiv>
                            <SubTitle>First Name </SubTitle>
                            <InputContainer>
                                <InputField
                                    value={first}
                                    onChange={handleFirst}
                                />
                                {first.length ?
                                    <ValidIcon />
                                    :
                                    <InvalidIcon />
                                }
                            </InputContainer>
                        </InputDiv>

                        <InputDiv>
                            <SubTitle>Last Name </SubTitle>
                            <InputContainer>
                                <InputField
                                    value={last}
                                    onChange={handleLast}
                                />
                                {last.length ?
                                    <ValidIcon />
                                    :
                                    <InvalidIcon />
                                }
                            </InputContainer>
                        </InputDiv>

                        <InputDiv>
                            <SubTitle>Email </SubTitle>
                            <InputContainer>
                                <InputField
                                    value={userEmail}
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
                                <InputField
                                    value={password}
                                    onChange={handlePass}
                                />
                                {validPasswordLength ?
                                    <ValidIcon />
                                    :
                                    <InvalidIcon />
                                }
                            </InputContainer>
                        </InputDiv>
                        <InputDiv>
                            <SubTitle>Confirm Password </SubTitle>
                            <InputContainer>
                                <InputField
                                    value={confirmPass}
                                    onChange={handleConfirmPass}
                                />
                                {isPasswordConfirmed ?
                                    <ValidIcon />
                                    :
                                    <InvalidIcon />
                                }
                            </InputContainer>
                    </InputDiv>
                    <CheckBoxMainCont>
                        <RenderTermsPanel />
                        <SubscriptionRequest />
                    </CheckBoxMainCont>
                    <SubmitButton onClick={handleSubmit}>Sign Up</SubmitButton>
                    <h2>Already have an account with us?</h2>
                    <Button2 onClick={goSignIn}>Sign In</Button2>

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
        </MainContainer>
        )
}

export default SignUp; 

const iconStyle = {
    padding: "10px", 
}

const CheckInputCont = styled.div`
`

const Check = styled.input`
width: 20px;
height: 20px;
`

const TermsSpan = styled.span`
    color: #5b5b5b; 
    text-decoration: underline; 
    cursor: pointer; 
&:hover{
    color: #cbcbcb; 
    text-decoration: none; 
}
&:active{
    color: #5b5b5b; 
    text-decoration: underline; 
}

`

const CheckBoxMainCont = styled.div`
width: 58%; 
margin-left: auto;
margin-right: auto; 
margin-top: 10px;
margin-bottom: 25px;
text-align: left;
`