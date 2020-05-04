import React from 'react';
import styled from 'styled-components';
import {
    Add
} from '@material-ui/icons';

const Container = styled.section`
    flex: 1;
`

const GridContainer = styled.div`
    flex: 1;
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: fit-content(100%);
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
    margin: 16px;
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

const Recipe = styled.div`
    height: fit-content;
    margin-left: 16px;
    margin-right: 16px;
    padding-bottom: 8px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 4px 0px 10px #00000033;
    user-select: none;
    transition: box-shadow 150ms, background-color 150ms;

    :hover{
        cursor: pointer;
        box-shadow: 4px 0px 20px #0000003f;
        background-color: #fafafa;
    }

    img{
        height: 200px;
        width: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0px 0px;
    }

    .dataContainer{
        display: flex;
        flex-direction: row;
        align-items: center;

        .leftComponent{
            display: flex;
            flex-direction: column;
            flex-grow: 1;

            .title{
                font-size: 24px;
                color: #000000;
                font-weight: 400;
                margin-left: 8px;
            }

            .calories{
                font-size: 20px;
                color: #666;
                font-weight: 300;
                margin-left: 8px;
            }
        }

        .price{
            font-size: 32px;
            color: #20a70a;
            margin-right: 8px;
        }
    }
`

const AddRecipe = styled(Recipe)`
    display: flex;
    flex-direction: column;
    height: 265px;
    justify-content: center;
    align-items: center;

    .icon{
        font-size: 32px;
        color: #444444;
    }

    .text{
        color: #333333;
        font-size: 24px;
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
                        <RecipeComponent recipe={recipe} />
                    )
                })}
                <AddRecipeComponent />
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

const AddRecipeComponent = () => {
    return(
        <AddRecipe>
            <Add className="icon" />
            <span className="text">
                Create new recipe
            </span>
        </AddRecipe>
    )
}

export default RecipesColumn;