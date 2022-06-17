import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    TextBlock,
    ListItem,
    UnorderedList,
} from './sectionStyle.js';

const ContactSection = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <h3>Contact Us</h3>
            <p>P.O. Box 1045</p>
            <p>Pasadena, CA 97750</p>
            <h4>Email us</h4>
            info@EarthTone.com
        </Container>
    )
}

export default ContactSection; 