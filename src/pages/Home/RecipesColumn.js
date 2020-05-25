import React from 'react';
import styled from 'styled-components';
import {
    Link
} from 'react-router-dom';

import {
    lightGrayBackground
} from '../../config/colorTheme';

const Container = styled.section`
    flex: 1;
    margin-left: 16px;
    margin-right: 16px;
`

const GridContainer = styled.div`
    flex: 1;
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-auto-rows: fit-content(1em);
    row-gap: 16px;

    @media (max-width: 1550px){
        grid-template-columns: 20% 20% 20% 20% 20%;
    }

    @media (max-width: 1270px){
        grid-template-columns: 25% 25% 25% 25%;
    }

    @media (max-width: 940px){
        grid-template-columns: 33% 33% 33%;
    }

    @media (max-width: 720px){
        grid-template-columns: 50% 50%;
    }

    @media (max-width: 500px){
        grid-template-columns: 100%;
    }
`

const Category = styled.div`
    flex: 1;
    margin: 32px 16px 16px 16px;
    background-color: transparent;
    font-size: 40px;
    transition-duration: 150ms;
    color: #000000;
    font-weight: 300;
    text-align: left;
`

const Recipe = styled.div`
    height: fit-content;
    margin-left: 16px;
    margin-right: 16px;
    padding-bottom: 16px;
    border-radius: 10px;
    background-color: ${lightGrayBackground};
    user-select: none;
    overflow: hidden;

    :hover{
        cursor: pointer;

        img{
            transform: scale(1.05);
        }
    }

    img{
        height: 200px;
        width: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0px 0px;
        transition: transform 150ms;
    }

    .dataContainer{
        margin-top: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .leftComponent{
            display: flex;
            flex-direction: column;
            flex-grow: 1;

            .title{
                font-size: 20px;
                color: #000000;
                font-weight: 400;
                margin-left: 16px;
            }

            .calories{
                font-size: 20px;
                color: #666;
                font-weight: 300;
                margin-left: 16px;
            }
        }

        .price{
            font-size: 30px;
            color: #20a70a;
            margin-right: 16px;
            margin-left: 16px;
            white-space: nowrap;
        }
    }
`

const RecipesColumn = ({recipes, bgColor, categoryName}) => {
    return(
        <Container>
            <Category bgColor={bgColor}>
                {categoryName}
            </Category>
            <GridContainer>
                {recipes.map(recipe => {
                    return(
                        <Link to={`/recipe/${recipe.id}`} style={{textDecoration: 'none'}}>
                            <RecipeComponent recipe={recipe} />
                        </Link>
                    )
                })}
            </GridContainer>
        </Container>
    )
}

const RecipeComponent = ({recipe}) => {
    return(
        <Recipe>
            <img src={recipe.image} />
            <div className="dataContainer">
                <div className="leftComponent">
                    <span className="title">{recipe.title}</span>
                    <span className="calories">{recipe.totalCalories} kcal</span>
                </div>
                <span className="price">{recipe.totalPrice} $</span>
            </div>
        </Recipe>
    )
}

export default RecipesColumn;