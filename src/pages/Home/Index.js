import React, {useState, useEffect} from 'react';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../../config/firebase';

import styled from 'styled-components';

import RecipesColumn from './RecipesColumn';
import NewRecipe from './NewRecipe';

const Container = styled.div`
    min-height: 100vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    font-family: 'Muli', sans-serif;

    @media (max-width: 1550px){
        flex-direction: column;
    }
`

const Home = () => {
    if(!firebase.apps.length > 0){
        firebase.initializeApp(firebaseConfig);
    }

    const [userId, setUserId] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [newRecipe, setNewRecipe] = useState({});

    const db = firebase.firestore();

    useEffect(() => {
        const GetUserId = () => {
            let _userId = window.sessionStorage.getItem("uid");

            setUserId(_userId);
        }

        if(userId <= 0)
            GetUserId();

        if(userId.length > 0){
            db.collection("recipes").where("owner", "==", userId).onSnapshot(snap => {
                let _recipes = [];
    
                snap.forEach(doc => {
                    let _recipe = doc.data();
                    _recipe.id = doc.id;
                    _recipes.push(_recipe);
                })
                setRecipes(__recipes => _recipes);
            })
        }
    }, [userId])

    return(
        <Container>
            <RecipesColumn 
                recipes={recipes.filter(recipe => (recipe.category === 0))} 
                bgColor="#e06324" 
                categoryName="Breakfast"
            />
            <RecipesColumn 
                recipes={recipes.filter(recipe => (recipe.category === 1))} 
                bgColor="#24a4e0" 
                categoryName="Dinner"
            />
            <RecipesColumn 
                recipes={recipes.filter(recipe => (recipe.category === 2))} 
                bgColor="#e02485" 
                categoryName="Supper"
            />
            <NewRecipe userId={userId} />
        </Container>
    )
}

export default Home;