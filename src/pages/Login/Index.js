import React, {useState, useEffect} from 'react'
import styled, {keyframes} from 'styled-components'
import * as firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from '../../config/firebase';
import {Redirect} from 'react-router-dom';
import {CircularProgress} from '@material-ui/core'
import {
    KeyboardBackspace
} from '@material-ui/icons'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #d5e6e4;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: 'Muli', sans-serif;
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

const fadeOut = keyframes`
    from{
        opacity: 1;
        transform: translateY(0%);
    }

    to{
        opacity: 0;
        transform: translateY(10%);
    }
`

const LoginContainer = styled.div`
    background-color: #ffffff;
    padding: 24px;
    box-shadow: 0px 4px 8px #0000001f;
    border-radius: 10px;
    transform: 
        scale(${props => props.active ? "1" : "0"}) 
        translateY(${props => props.active ? "0%" : "-10%"});
    transition: transform 0.25s;

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
    color: ${props => props.color || "#ffffff"};
    background-color: ${props => props.bgColor || "#5D5BB5"};
    opacity: ${props => props.disabled ? "0.6" : "1"};
    padding: 16px;
    margin-top: ${props => props.marginTop || "0px"};

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

const RegisterContainer = styled(LoginContainer)`
    position: absolute;
`

const RegisterForm = styled(LoginForm)`
    
`

const GoBackButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
    user-select: none;
    border-radius: 10px;
    padding: 8px;
    background-color: #00000000;
    transition: background-color 0.15s;

    :hover{
        cursor: pointer;
        background-color: #00000015;
    }

    .icon{
        color: #000000;
        font-size: 24px;
        margin-right: 8px;
    }

    .text{
        color: #000000;
        font-size: 18px;
    }
`

const Index = () => {
    const [logged, setLogged] = useState(false);
    const [logging, setLogging] = useState(false);
    const [loginActive, setLoginActive] = useState(true);
    const [registering, setRegistering] = useState(false);

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

    const handleRegister = async (e) => {
        const credentials = {
            email: e.target[0].value,
            password: e.target[1].value
        }

        e.preventDefault();
        await RegisterWithCredentials(credentials);
    }

    const RegisterWithCredentials = async (credentials) => {
        setRegistering(true);
        firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
            let user = firebase.auth().currentUser;
            window.sessionStorage.setItem('uid', user.uid);
            setLogged(true);
            setRegistering(false);
        })
        .catch(err => {
            setRegistering(false);
            console.log(err)
        })
    }

    const LoginWithCredentials = async (credentials) => {
        setLogging(true);
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
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
            <LoginContainer active={loginActive}>
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
                    <Submit 
                        type="button" 
                        value="Create new account" 
                        marginTop="16px"
                        color="#5D5BB5"
                        bgColor="#ffffff"
                        onClick={() => {
                            setLoginActive(false);
                        }}
                    />
                </form>
                <Divider />
                <Submit 
                    bgColor="#5178b5"
                    type="button"
                    value="Login with Facebook"
                    disabled
                />
            </LoginContainer>
            <RegisterContainer active={!loginActive}>
                <GoBackButton
                    onClick={() => setLoginActive(true)}
                >
                    <KeyboardBackspace className="icon" />
                    <span className="text">Go back</span>
                </GoBackButton>
                <form onSubmit={handleRegister}>
                    <RegisterForm>
                        <span className="label">E-mail</span>
                        <input 
                            type="email" 
                            className="textInput"
                        />
                    </RegisterForm>
                    <RegisterForm>
                        <span className="label">Password</span>
                        <input
                            type="password"
                            className="textInput"
                        />
                    </RegisterForm>
                    {registering ? 
                        <LoggingProgress size={24} /> : 
                        <Submit type="submit" value="Register" />
                    }
                </form>
            </RegisterContainer>
        </Container>
    )
}

export default Index;