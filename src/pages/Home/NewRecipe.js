import React, { useState } from 'react'
import styled, {keyframes} from 'styled-components';
import {
    Add
} from '@material-ui/icons';

const Container = styled.div`
    display: flex;
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

const fadeInFixed = keyframes`
    from{
        opacity: 0;
        transform: translateY(-60%);
    }

    to{
        opacity: 1;
        transform: translateY(-50%);
    }
`

const fadeOutFixed = keyframes`
    from{
        opacity: 1;
        transform: translateY(-50%);
    }

    to{
        opacity: 0;
        transform: translateY(-60%);
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
    max-height: 65%;
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

const NewRecipe = () => {
    const [modalOpen, setModalOpen] = useState(false);
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
            <NewRecipeModal
                open={modalOpen}
            >
                <form>
                    <span className="imageInputLabel">
                        Recipe image
                    </span>
                    <input 
                        type="file" 
                        className="imageInput" 
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
                </form>
            </NewRecipeModal>
            </NewRecipeBackground>
        </Container>
    )
}

export default NewRecipe;