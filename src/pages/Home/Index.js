import React, {useState, useEffect} from 'react';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../../config/firebase';

import styled from 'styled-components';

import CardsHeader from './CardsHeader';
import RecipesColumn from './RecipesColumn';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #d5e6e4;
    display: flex;
    flex-direction: column;
`

const Content = styled.section`
    flex-grow: 1;
    margin-left: 32px;
    margin-right: 32px;
    margin-bottom: 16px;
    border-radius: 0px 10px 10px 10px;
    display: flex;
    flex-direction: row;
`

const Home = () => {
    if(!firebase.apps.length > 0){
        firebase.initializeApp(firebaseConfig);
    }

    const [user, setUser] = useState(firebase.auth().currentUser);
    const [recipes, setRecipes] = useState([]);

    const db = firebase.firestore();

    useEffect(() => {
        db.collection("recipes").where("owner", "==", user.uid).onSnapshot(snap => {
            console.log(user.uid);
            let _recipes = [];

            snap.forEach(doc => {
                _recipes.push(doc.data());
            })
            setRecipes(__recipes => _recipes);
        })
    }, [])

    useEffect(() => {
        console.log(recipes);
    }, [recipes])

    return(
        <Container>
            <CardsHeader />
            <Content>
                <RecipesColumn recipes={recipes.filter(recipe => (recipe.category === 0))} />
                <RecipesColumn recipes={recipes.filter(recipe => (recipe.category === 1))} />
                <RecipesColumn recipes={recipes.filter(recipe => (recipe.category === 2))} />
            </Content>
        </Container>
    )
}

export default Home;