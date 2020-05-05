import React from 'react'
import styled from 'styled-components';

const Container = styled.section`
    display: flex;
    flex-direction: row;
    margin: 32px;
`

const Category = styled.div`
    flex: 1;
    margin-left: 16px;
    margin-right: 16px;
    background-color: ${props => props.bgColor};
    border-radius: 100px;
    padding: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 24px;
    transition-duration: 150ms;
    color: #ffffff;
    text-align: center;
`

const CardsHeader = (props) => {
    return(
        <Container>
            <Category 
                bgColor="#e06324"
            >
                Breakfast
            </Category>
            <Category 
                bgColor="#24a4e0"
            >
                Dinner
            </Category>
            <Category 
                bgColor="#e02485"
            >
                Supper
            </Category>
        </Container>
    )
} 

export default CardsHeader;