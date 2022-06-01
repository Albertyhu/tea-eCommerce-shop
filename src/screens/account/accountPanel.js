import React, { useState, useEffect } from 'react';
import SlidingPanel from 'react-sliding-side-panel';
import { MyContext } from '../../components/contextItem.js';
import '../../style/button.css'; 
import './account.css'; 
import { Link } from 'react-router-dom'; 
import { HandleSignOut } from '../../components/signOut.js'; 
import { MenuOptions } from './accountStyledComponents.js'; 

const AccountPanel = props => {
    const { openPanel } = props; 
    const { getAccountPanelRef, closeAccountPanel } = React.useContext(MyContext); 
    const accountRef = getAccountPanelRef(); 
    
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (openPanel && accountRef.current && !accountRef.current.contains(e.target)) {
                closeAccountPanel(); 
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return ()=> document.removeEventListener("mousedown", checkIfClickedOutside)
    }, [openPanel])

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [ panelWidth, setPanelWidth ] = useState(50)

    return (
        <div>
            <SlidingPanel
                type={'right'}
                isOpen={openPanel}
                size={20}
              //  panelContainerClassName="accountPanelContainer"
                noBackdrop={true}
            >
                <div className="panel-container" ref={accountRef}>
                    <MenuOptions>Your Account</MenuOptions>
                    <MenuOptions onClick={() => {
                        HandleSignOut();
                        closeAccountPanel();
                    }}>Sign Out</MenuOptions>
                </div>
            </SlidingPanel>
        </div>

        )

}

export default AccountPanel; 