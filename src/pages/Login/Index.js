import React, {useState, useEffect} from 'react'
import styled, {keyframes} from 'styled-components'
import * as firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from '../../config/firebase';
import {Redirect} from 'react-router-dom';
import {CircularProgress} from '@material-ui/core'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #d5e6e4;
    display: flex;
    justify-content: center;
    align-items: center;
`

const fadeIn = keyframes`
    from{
        opacity: 0;
        transform: translateY(-10%);
    }

    to{
        opacity: 1;
        transform: translateY(0%);
    }
`

const LoginContainer = styled.div`
    background-color: #ffffff;
    padding: 24px;
    box-shadow: 0px 4px 8px #0000001f;
    border-radius: 10px;
    animation: ${fadeIn} 0.5s;

    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;

    .label{
        color: #000000;
        font-size: 22px;
        margin-bottom: 8px;
    }

    .textInput{
        color: #000000cc;
        font-size: 20px;
        border-radius: 10px;
        border: .5px solid #000000aa;
        padding: 8px;
    }
`

const Submit = styled.input`
    width: 100%;
    border-radius: 10px;
    border: none;
    font-size: 20px;
    color: #ffffff;
    background-color: ${props => props.bgColor || "#5D5BB5"};
    opacity: ${props => props.disabled ? "0.6" : "1"};
    padding: 16px;

    :hover{
        cursor: ${props => props.disabled ? "default" : "pointer"};
    }
`

const Divider = styled.div`
    height: 1px;
    background-color: #00000055;
    margin: 16px;
`

const LoggingProgress = styled(CircularProgress)`
    margin: 16px;
`

const Index = () => {
    const [logged, setLogged] = useState(false);
    const [logging, setLogging] = useState(false);

    if(firebase.apps.length <= 0){
        firebase.initializeApp(firebaseConfig);
    }

    const handleSubmit = async (e) => {
        const credentials = {
            email: e.target[0].value,
            password: e.target[1].value
        }
    
        e.preventDefault();
        await LoginWithCredentials(credentials);
    }

    const LoginWithCredentials = async (credentials) => {
        setLogging(true);
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((res) => {
            let user = firebase.auth().currentUser;
            window.sessionStorage.setItem('uid', user.uid)
            setLogged(true);
            setLogging(false);
        })
        .catch(err => {
            console.error(err.code);
            console.error(err.message);
            setLogging(false);
        })
    }

    if(logged){
        return(<Redirect to="/home" push />)
    }

    return(
        <Container>
            <LoginContainer>
                <form onSubmit={handleSubmit}>
                    <LoginForm>
                        <span className="label">E-mail</span>
                        <input 
                            type="email" 
                            className="textInput"
                        />
                    </LoginForm>
                    <LoginForm>
                        <span className="label">Password</span>
                        <input
                            type="password"
                            className="textInput"
                        />
                    </LoginForm>
                    {logging ? 
                        <LoggingProgress size={24} /> : 
                        <Submit type="submit" value="Login" />
                    }
                </form>
                <Divider />
                <Submit 
                    bgColor="#5178b5"
                    type="button"
                    value="Login with Facebook"
                    disabled
                />
            </LoginContainer>
        </Container>
    )
}

export default Index;