import React, { useState, useContext, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import {
    HeaderTagLine,
    SecHeadBarCont,
    NonMemberTag,
    MemberTag,
} from './headerStyle.js'; 
import { MyContext } from '../components/contextItem.js';
import { BsFilePersonFill } from 'react-icons/bs';

const SecondaryHeaderBar = props => {
    const [member, setMember] = useState(false)
    const { getCurrentUser } = useContext(MyContext); 

    useEffect(() => {
        setMember(getCurrentUser)
        console.log(member)
    }, [])

    return (
        <SecHeadBarCont>
            <HeaderTagLine>Orders of $50 or more will receive free shipping</HeaderTagLine>
            {member ?
                <MemberTag><BsFilePersonFill />Account</MemberTag>
                :
                <NonMemberTag><Link to="/sign_in" style={ styledLink}>Sign in</Link>,
                    or <Link to="/sign_up" style={styledLink}>create a new account.</Link></NonMemberTag>
            }
        </SecHeadBarCont>
    )
}

const styledLink = {
    color: "#ffffff",
    fontWeight: "bold",
}


export default SecondaryHeaderBar; 