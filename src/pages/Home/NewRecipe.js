import React, { useState } from 'react'
import styled, {keyframes} from 'styled-components';
import {
    Add,
    Send,
    Close
} from '@material-ui/icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage'
import { Redirect } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    font-family: 'Muli', sans-serif;
`

const AddRecipeButton = styled.div`
    user-select: none;
    background-color: #e02485;
    border-radius: 50px;
    padding: 16px;
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    box-shadow: 0px 4px 10px #00000033;
    transition-duration: 150ms;

    .icon{
        font-size: 32px;
        margin-right: 8px;
    }

    :hover{
        cursor: pointer;
        box-shadow: 0px 4px 20px #00000055;
        background-color: #c72277;
    }

    @media (max-width: 1270px){
        font-size: 16px;

        .icon{
            font-size: 24px;
        }
    }
`

const NewRecipeBackground = styled.div`
    background-color: ${props => props.open ? "#00000077" : "#00000000"};
    transform: scale(${props => props.open ? "1" : "0"});
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
`

const NewRecipeModal = styled.div`
    background-color: #ffffff;
    padding: 16px;
    transform: 
        scale(${props => props.open ? "1" : "0"}) 
        translateY(${props => props.open ? "50%" : "40%"})
        translateX(-50%);
    transition: transform 0.25s;
    position: fixed;
    bottom: 50%;
    left: 50%;
    border-radius: 10px;
    max-height: 70%;
    box-shadow: 0px 4px 10px #00000033;
    overflow-y: scroll;

    form{
        display: flex;
        flex-direction: column;
    }

    .imageInput{
        background-color: #ffffff;
        padding: 16px;
        font-size: 16px;
        border-radius: 10px;
        border: 1px solid red;
        margin-bottom: 16px;
    }

    .imageInputLabel{
        font-size: 24px;
        color: #000000;
        margin-bottom: 8px;
    }
`

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;

    .label{
        color: #000000;
        font-size: 20px;
        margin-bottom: 8px;
    }

    .textInput{
        color: #000000cc;
        font-size: 18px;
        border-radius: 10px;
        border: .5px solid #000000aa;
        padding: 8px;
    }
`

const SendButton = styled.input`
    user-select: none;
    background-color: #5D5BB5;
    padding: 8px;
    border-radius: 10px;
    align-items: center;
    margin-bottom: 8px;
    font-size: 24px;
    color: #ffffff;
`

const CloseButton = styled(Close)`
    padding: 16px;
    position: absolute;
    top: 15%;
    right: 50%;
    background-color: #ffffff;
    border-radius: 50px;
    color: red;
    font-size: 24px;
    z-index: 2;
    transform: translate(50%, -80%);
    box-shadow: 0px 4px 10px #00000044;
    transition: background-color 150ms;

    :hover{
        cursor: pointer;
        background-color: #eaeaea;
    }
`

const Categories = styled.div`
    display: flex;
    flex-direction: row;
`

const CategoryStyled = styled.div`
    flex: 1;
    margin: 8px;
    background-color: ${props => props.bgColor};
    padding: 8px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    transition: bacground-color 150ms;

    img{
        width: 40px;
        height: 40px;
        margin: 4px;
    }

    .text{
        font-size: 16px;
        color: #ffffff;
        margin: 4px;
    }

    :hover{
        cursor: pointer;
    }
`

const NewRecipe = ({userId}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [category, setCategory] = useState(1);

    const db = firebase.firestore();
    const storage = firebase.storage();

    const CreateNewRecipe = (e) => {
        e.preventDefault();
        let elements = e.target;
        let date = Date.now();

        if(
            elements[0].files.length < 1 ||
            elements[1].value.length < 1 ||
            elements[2].value.length < 1 ||
            elements[3].value.length < 1 ||
            elements[4].value.length < 1 ||
            elements[5].value.length < 1 || 
            elements[6].value.length < 1
        ){
            alert("Did not fill all fields")
        }else{
            if(!userId){
                alert("User logged out.")
                return <Redirect to="/" />
            }
            
            storage.ref().child(userId + "/" + elements[1].value + '-' + date + ".jpg").put(e.target[0].files[0])
            .then(snap => {
                snap.ref.getDownloadURL().then(url => {
                    db.collection('recipes').add({
                        title: elements[1].value,
                        ingredients: elements[4].value,
                        stepsToProduce: elements[5].value,
                        shortDescription: elements[6].value,
                        owner: userId,
                        image: url,
                        totalCalories: elements[2].value,
                        totalPrice: elements[3].value,
                        category,
                        comments: []
                    }).then(docRef => {
                        setModalOpen(false);
                    }).catch(err => {
                        console.log(err);
                        setModalOpen(false);
                    })
                })
            })
        }
    }

    return(
        <Container>
            <AddRecipeButton
                onClick={() => setModalOpen(!modalOpen)}
            >
                <Add className="icon" />
                Create new recipe
            </AddRecipeButton>
            <NewRecipeBackground
                open={modalOpen}
            >
                <CloseButton 
                    onClick={() => setModalOpen(false)}
                />
                <NewRecipeModal
                    open={modalOpen}
                >
                    <form onSubmit={CreateNewRecipe}>
                        <span className="imageInputLabel">
                            Recipe image
                        </span>
                        <input 
                            type="file" 
                            className="imageInput"
                            accept="image/png, image/jpeg" 
                        />
                        <FormField>
                            <span
                                className="label"
                            >Title</span>
                            <input 
                                type="text"
                                className="textInput"
                            />
                        </FormField>
                        <Categories>
                            <CategoryStyled 
                                bgColor={category === 0 ? "#ad4d1c" : "#e06324"}
                                onClick={() => setCategory(0)}
                            >
                                <img src="https://www.pngrepo.com/download/169159/breakfast.png" />
                                <span className="text">
                                    Breakfast
                                </span>
                            </CategoryStyled>
                            <CategoryStyled 
                                bgColor={category === 1 ? "#1a76a1" : "#24a4e0"}
                                onClick={() => setCategory(1)}
                            >
                            <img src="https://i.ya-webdesign.com/images/dinner-vector-icon-9.png" />
                                <span className="text">
                                    Dinner
                                </span>
                            </CategoryStyled>
                            <CategoryStyled 
                                bgColor={category === 2 ? "#9e1e60" : "#e02485"}
                                onClick={() => setCategory(2)}
                            >
                                <img src="https://www.pngrepo.com/png/250546/170/supper.png" />
                                <span className="text">
                                    Supper
                                </span>
                            </CategoryStyled>
                        </Categories>
                        <FormField>
                            <span
                                className="label"
                            >Total calories</span>
                            <input 
                                type="number"
                                className="textInput"
                            />
                        </FormField>
                        <FormField>
                            <span
                                className="label"
                            >Total price</span>
                            <input 
                                type="number"
                                className="textInput"
                            />
                        </FormField>
                        <FormField>
                            <span
                                className="label"
                            >Ingredients</span>
                            <textarea
                                className="textInput"
                                rows="5"
                            />
                        </FormField>
                        <FormField>
                            <span
                                className="label"
                            >Steps to produce</span>
                            <textarea
                                className="textInput"
                                rows="5"
                            />
                        </FormField>
                        <FormField>
                            <span
                                className="label"
                            >Short description</span>
                            <textarea
                                className="textInput"
                                rows="3"
                            />
                        </FormField>
                        <SendButton type="submit" value="Create" />
                    </form>
                </NewRecipeModal>
            </NewRecipeBackground>
        </Container>
    )
}

export default NewRecipe;