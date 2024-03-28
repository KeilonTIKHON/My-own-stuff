import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Home from './Home'
import Menu from './Menu';
import { Title } from './Title';
import './index.css'

const app=ReactDOMClient.createRoot(document.getElementById("app"))



app.render(
    <>
    <Menu />
    <Home />
    <Title />
    </>

)
//npm run start --prefix my-app
