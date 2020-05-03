import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
    flex: 1;
    display: grid;
    grid-template-columns: 50% 50%;
    row-gap: 10px;
`

const Recipe = styled.div`
    height: fit-content;
    margin-left: 16px;
    margin-right: 16px;
    padding-bottom: 8px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 4px 0px 10px #00000033;

    img{
        height: 200px;
        width: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0px 0px;
    }

    .title{
        font-size: 24px;
        color: #000000;
        font-weight: 400;
        margin: 8px;
    }

    .calories{
        font-size: 20px;
        color: #666;
        font-weight: 300;
        margin: 8px;
    }
`

const RecipesColumn = (props) => {
    let recipes = props.recipes;

    return(
        <Container>
            {recipes.map(recipe => {
                return(
                    <Recipe>
                        <img src={recipe.image} />
                        <span className="title">{recipe.title}</span>
                        <span className="calories">{recipe.totalCalories} kcal</span>
                    </Recipe>
                )
            })}
        </Container>
    )
}

export default RecipesColumn;