import React, { useEffect, useRef, useCallback } from 'react'; 
import styled from 'styled-components'; 
import uuid from 'react-uuid'; 
import { Link, useNavigate, useLocation  } from 'react-router-dom'

const RenderItem = props => {
    const { reset } = props;
    const navigate = useNavigate(); 
    const GoProductProfile = useCallback(() => navigate('/product_profile', {
        state: {
            id: props.ID,
        }
    }), [navigate]); 

    return (
        <ListItem
            onClick={() => {
                GoProductProfile();
                reset();
            }}>{props.name}</ListItem>

        )
}

const RenderSearchResults = props => {
    const panelRef = useRef(); 
    const { searchResult, reset, diplaySearchResults } = props; 

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (diplaySearchResults && panelRef.current && !panelRef.current.contains(e.target)) {
                reset(); 
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => document.removeEventListener("mousedown", checkIfClickedOutside)
    }, [])
    if (searchResult.length > 0) {
        return (
            <ListComponent ref={panelRef}>
                {
                    searchResult.map(val => <RenderItem {...val}
                        reset={reset}
                        key={uuid()}
                    />)
                }
            </ListComponent>

        )
    }
}

export default RenderSearchResults;

const ListComponent = styled.div`
    background-color: #ffffff;
    width: 60%;
    margin-top: 50px;
    position: absolute;
    overflow-y: scroll;
    padding-top: 10px;
`

const ListItem = styled.div`
    margin-left: 10px;
    margin-right: 10px
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: 'Times New Roman', Times, serif; 
    cursor: pointer;
    &:hover {
     background-color: #cbcbcb;
    }
    &:active {
     font-weight: bold;
    }

`

const linkStyle = {
    textDecoration: 'none', 
    color: "#000000",
}