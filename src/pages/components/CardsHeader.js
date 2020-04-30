import React from 'react'
import styled from 'styled-components';

const Container = styled.section`
    display: flex;
    flex-direction: row;
    margin: 16px;
    margin-bottom: 0px;
`

const Card = styled.div`
    margin-left: 16px;
    margin-right: 16px;
    background-color: ${props => props.active ? "#ffffff" : "#d5d5d5"};
    border-radius: 10px 10px 0px 0px;
    padding: 12px;
    font-size: 20px;
    transition-duration: 150ms;

    :hover{
        cursor: pointer;
        ${props => props.active ? "background-color: #ffffff" : "background-color: #cccccc"}
    }
`

const CardsHeader = (props) => {
    return(
        <Container>
            <Card 
                active={props.active === 0}
                onClick={() => props.setCurrentCard(0)}
            >
                Breakfast
            </Card>
            <Card 
                active={props.active === 1}
                onClick={() => props.setCurrentCard(1)}
            >
                Dinner
            </Card>
            <Card 
                active={props.active === 2}
                onClick={() => props.setCurrentCard(2)}
            >
                Supper
            </Card>
        </Container>
    )
} 

export default CardsHeader;