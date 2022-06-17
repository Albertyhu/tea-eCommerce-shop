import React, {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    Container,
    TextBlock,
    ListItem,
    UnorderedList,
} from './sectionStyle.js'; 

const RenderInformationSection = () => {
    const navigate = useNavigate(); 
    const goAboutUs = useCallback(() => navigate('/About_Us', {}), [navigate])
    const goCareer = useCallback(() => navigate('/career', {}), [navigate])
    const goSiteMap = useCallback(() => navigate('/sitemap', {}), [navigate])

    return (
        <Container>
            <h3>Information</h3>
            <ListItem onClick={goAboutUs }>About Us</ListItem>
            <ListItem onClick={goCareer}>Careers</ListItem>
            <ListItem onClick={goSiteMap}>Site Map</ListItem>
        </Container> 
        )
}

export default RenderInformationSection; 