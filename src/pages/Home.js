import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from '../config/firebase';
import styled from 'styled-components';

import CardsHeader from './components/CardsHeader';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #d5e6e4;
    display: flex;
    flex-direction: column;
`

const Content = styled.section`
    flex-grow: 1;
    background-color: #ffffff;
    margin-left: 32px;
    margin-right: 32px;
    margin-bottom: 16px;
    border-radius: 0px 10px 10px 10px;
`

const Home = () => {
    if(!firebase.apps.length > 0){
        firebase.initializeApp(firebaseConfig);
    }

    const [user, setUser] = useState(firebase.auth().currentUser);
    const [currentCard, setCurrentCard] = useState(0);

    return(
        <Container>
            <CardsHeader active={currentCard} setCurrentCard={setCurrentCard} />
            <Content>

            </Content>
        </Container>
    )
}

export default Home;