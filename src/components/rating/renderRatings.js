import React, { useState, useEffect, createRef} from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import styled from 'styled-components';

//Check if ratings exist 
//determine how many filled stars needs to be rendered by using Math.floor(rating) 
//determine if a half star needs to be rendered by rounding down to 0.5 or 0.0
//determine how many empty stars need to be rendered by  5 - (Math.floor(rating) + (existing half star))

const RenderRatings = props => {
    const { rating } = props;
    const [FullStarNum, setFullStar] = useState(Math.floor(rating)); 
    const [displayHalfStar, setDisplayHalfStar] = useState(false); 
    const [EmpStarNum, setEmpStarNum] = useState(0)
    const [FullStarArr, setFullStarArr] = useState([])
    const [EmptyStarArr, setEmptyStarArr] = useState([])
    useEffect(() => {
        //determine if half star should be rendered
        var halfStar = 0
        if (rating % (Math.floor(rating)) >= 0.5) {
            setDisplayHalfStar(true)
            halfStar = 1; 
        }
        else {
            setDisplayHalfStar(false)
        }
        setEmpStarNum(5 - FullStarNum - halfStar)

    }, [rating])


    useEffect(() => {
        setFullStarArr(AddFullStars(FullStarNum))
    }, [FullStarNum])


    useEffect(() => {
        setEmptyStarArr(AddEmptyStars(EmpStarNum))
    }, [EmpStarNum])

    //I tried the for loop earlier, but couldn't get to render a component multiple times.
    //So I  tried the Array.map method there. 
    const AddFullStars = num => {
        var arr = []
        for (var i = 0; i < num; i++) {
            arr.push(i)
        }
        return arr; 
    }
    
    const AddEmptyStars = num => {
        var arr = []
        for (var i = 0; i < num; i++) {
            arr.push(i)
        }
        return arr;
    }

    return (
        <RatingsContainer>
            {FullStarNum ? FullStarArr.map(val => <BsStarFill style={StarStyle} />) : null}
            {displayHalfStar ? <BsStarHalf style={StarStyle} /> : null }
            {EmpStarNum ? EmptyStarArr.map(val => <BsStar style={EmptyStarStyle} />)  : null}
        </RatingsContainer>
        )
}

export default RenderRatings; 


const EmptyStarStyle = {
    color: "#8B8B8B",
    width: "25px",
    height: "25px",
}

const StarStyle = {
    color: "#DECB17",
    width: "25px",
    height: "25px",
}

const StarContainer = styled.div`
   display: inline-block;
   width: auto;
   height: auto;
`

const RatingsContainer = styled.div`
    margin-left: auto;
    margin-right: auto; 
`
