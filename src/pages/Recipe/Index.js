import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    useParams
} from 'react-router-dom'
import * as firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '../../config/firebase'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #d5e6e4;
    min-height: 100vh;
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
`

const SecondContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    flex: 1;
    object-fit: cover;
    max-height: 50%;
`

const MetaInfo = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #cacaca;
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

    .ingredients{
        font-size: 24px;
        color: #000000;
        flex: 1;
    }

    .description{
        margin: 8px;
        font-size: 24px;
        color: #000000;
        flex: 1;
    }
`

const Index = () => {
    if(!firebase.apps.length > 0){
        firebase.initializeApp(firebaseConfig);
    }

    const { id } = useParams();
    const db = firebase.firestore();
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        db.collection('recipes').doc(id).onSnapshot(snap => {
            setRecipe(snap.data());
        })
    })

    return(
        <Container>
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
                        <span className="ingredients">
                            {recipe.ingredients}
                        </span>
                        <span className="description">
                            {recipe.shortDescription}
                        </span>
                    </DescriptionIngredients>
                </FirstContainer>
                <SecondContainer>

                </SecondContainer>
            </Content>
        </Container>
    )
}

export default Index;