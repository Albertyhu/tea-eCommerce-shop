import React, { useEffect, useState } from 'react'
import { MyContext } from '../components/contextItem.js'; 
import styled from 'styled-components'; 
import { BiSearchAlt2 } from 'react-icons/bi';
import RenderSearchResults from './renderList.js'; 

const SearchBar = props => {
    const { data } = props; 
    const [query, setQuery] = useState(''); 
    const [results, setResults] = useState([]); 
    const [diplaySearchResults, setDisplay] = useState(false); 
    const searchByCriteria = (obj, criteria) => {
        switch (criteria) {
            case "name": {
                return obj.name.toLowerCase().search(query.toTrim().toLowerCase())
            }
            default: 
                return -1
        }
    }

    const filterData = () => {
        if (data) {
            let newArray = data.filter(val => {
               return searchByCriteria(val, "name") > -1
            })
            setResults(newArray.map(val => val))
        }
    }

    const handleQuery = event => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        filterData(); 
        if (results.length > 0 && query.length > 0) {
            setDisplay(true)
        }
        else {
            setDisplay(false)
            return () => { setResults([])}
        }
    }, [query])


    return (
        <BarContainer>
            <Bar
                value={query}
                onChange={handleQuery}
            />
            <BiSearchAlt2 style={iconStyle} />
            {diplaySearchResults ? <RenderSearchResults searchResults={results} />
                :
                null
            }
        </BarContainer>
        )
}

export default SearchBar; 

const BarContainer = styled.div`
display: flex; 
background-color: #ffffff; 
border-radius: 5px; 
height: 30px;
margin: auto;
width: 60%;
`

const Bar = styled.input`
width: 100%; 
border: none;
outline: none;
padding: 15px; 
border-radius: 5px; 
`

const iconStyle = {
    width: "25px", 
    height: "25px", 
    padding: "5px",
}