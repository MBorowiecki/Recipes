import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    useParams,
    useHistory
} from 'react-router-dom'
import * as firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '../../config/firebase'
import {
    ArrowBack
} from '@material-ui/icons'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #d5e6e4;
    min-height: 100vh;
    font-family: 'Muli', sans-serif;
`

const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;

    @media (max-width: 1270px){
        flex-direction: column;
    }
`

const FirstContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    box-shadow: 4px 0px 15px #00000033;
    max-width: 33vw;
    max-height: 100vh;
`

const SecondContainer = styled.div`
    flex: 2;
`

const Image = styled.img`
    flex: 1;
    object-fit: cover;
    max-height: 40%;
`

const MetaInfo = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #dadada;
    margin: 16px;
    padding: 8px;
    border-radius: 10px;
    align-items: center;

    .leftComponent{
        flex: 3;
        display: flex;
        flex-direction: column;

        .title{
            margin: 8px;
            font-size: 30px;
            color: #111111;
            flex: 1;
        }

        .calories{
            margin: 8px;
            font-size: 30px;
            font-weight: 300;
            flex: 1;
            color: #222222;
        }
    }

    .price{
        margin: 16px;
        font-size: 48px;
        flex: 1;
        color: #20a70a;
        text-align: right;
    }
`

const DescriptionIngredients = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    margin: 16px;

    .left{
        flex: 1;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #888888;
        padding: 8px 16px 8px 8px;

        .label{
            font-size: 24px;
            color: #4a4a4a;
            margin-bottom: 8px;
            font-weight: 300;
        }

        .ingredients{
            flex-grow: 1;
            font-size: 20px;
            color: #101010;
            
            ul{
                margin: 0px;
                padding-left: 20px;
                overflow-y: scroll;
            }
        }
    }

    .right{
        flex: 1;
        margin: 8px 8px 8px 16px;
        display: flex;
        flex-direction: column;

        .label{
            font-size: 24px;
            color: #4a4a4a;
            margin-bottom: 8px;
            font-weight: 300;
        }

        .description{
            flex-grow: 1;
            font-size: 20px;
            color: #101010;
        }
    }
`

const StepsToProduce = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 16px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 4px 15px #00000033;

    .label{
        color: #4a4a4a;
        font-size: 24px;
        margin-bottom: 8px;
        font-weight: 300;
    }

    .text{
        color: #101010;
        flex-grow: 1;
        font-size: 24px;

        ul{
            margin: 0px;
            padding-left: 24px;
        }
    }
`

const BackButton = styled.div`
    position: fixed;
    top: 16px;
    left: 16px;
    padding: 8px;
    background-color: #00000033;
    border: 1px solid #ffffff;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0px 4px 10px #00000022;
    user-select: none;
    transition: background-color 100ms, box-shadow 100ms;

    :hover{
        cursor: pointer;
        background-color: #0000003f;
        box-shadow: 0px 4px 15px #0000003f;
    }

    .icon{
        font-size: 24px;
        color: #ffffff;
    }

    .text{
        font-size: 20px;
        color: #ffffff;
    }
`

const Index = () => {
    if(!firebase.apps.length > 0){
        firebase.initializeApp(firebaseConfig);
    }

    const { id } = useParams();
    const history = useHistory();
    const db = firebase.firestore();
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        db.collection('recipes').doc(id).onSnapshot(snap => {
            setRecipe(snap.data());
        })

        console.log(recipe.ingredients)
    })

    return(
        <Container>
            <BackButton
                onClick={() => history.goBack()}
            >
                <ArrowBack className="icon" />
                <span className="text">Go back</span>
            </BackButton>
            <Content>
                <FirstContainer>
                    <Image src={recipe.image} />
                    <MetaInfo>
                        <div className="leftComponent">
                            <span className="title">
                                {recipe.title}
                            </span>
                            <span className="calories">
                                {recipe.totalCalories} kcal
                            </span>
                        </div>
                        <div className="price">
                            {recipe.totalPrice} $
                        </div>
                    </MetaInfo>
                    <DescriptionIngredients>
                        <div className="left">
                            <span className="label">Ingredients</span>
                            <span className="ingredients">
                                <ul>
                                    {recipe.ingredients && recipe.ingredients.split('\n').map(ingredient => {
                                        return(<li>{ingredient}</li>)
                                    })}
                                </ul>
                            </span>
                        </div>
                        <div className="right">
                            <span className="label">Description</span>
                            <span className="description">
                                {recipe.shortDescription}
                            </span>
                        </div>
                    </DescriptionIngredients>
                </FirstContainer>
                <SecondContainer>
                    <StepsToProduce>
                        <span className="label">
                            Steps to produce
                        </span>
                        <span className="text">
                            <ul>
                                {recipe.stepsToProduce && recipe.stepsToProduce.split('\n').map(step => 
                                <li>
                                    {step}
                                </li>)}
                            </ul>
                        </span>
                    </StepsToProduce>
                </SecondContainer>
            </Content>
        </Container>
    )
}

export default Index;