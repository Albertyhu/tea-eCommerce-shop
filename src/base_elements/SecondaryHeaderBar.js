import React, { useState, useContext, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import {
    HeaderTagLine,
    SecHeadBarCont,
    NonMemberTag,
    MemberTag,
    WelcomeTag, 
} from './headerStyle.js'; 
import { MyContext } from '../components/contextItem.js';
import { BsFilePersonFill } from 'react-icons/bs';

import { getAuth, onAuthStateChanged} from 'firebase/auth'
import { doc, getDoc} from 'firebase/firestore' 
import { db } from '../firebase/initializeFirebase.js';

const auth = getAuth() 
const SecondaryHeaderBar = props => {
    const [member, setMember] = useState(null)
    const [data, setData] = useState(null)
    const { getCurrentUser, openAccountPanel } = useContext(MyContext); 

    const handleOpenPanel = () => { openAccountPanel() }; 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setMember(user)
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef); 
                if (docSnap.exists()) {
                    setData(docSnap.data())
                }
            }
            else {
                setMember(null)
                setData(null)
            }
        })
        //The following code is necessary. The component needs to unmount for sliding panel to work
        return () => unsubscribe(); 
        
    }, [])
    
    return (
        <SecHeadBarCont>
            {data ?
                <WelcomeTag>Welcome, {data.first_name}</WelcomeTag>
                :
                null
            }

            <HeaderTagLine>Orders of $50 or more will receive free shipping</HeaderTagLine>
            {member ?
                <MemberTag onClick={handleOpenPanel}><BsFilePersonFill />Account</MemberTag>
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