import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from '@auth0/auth0-react'
import App from './App'

const domain = 'dev-bwyc6x83.us.auth0.com'
const clientId = '316I4eZRFsJatRu7NkwF15ShW1bBBqLK'


ReactDOM.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}>
        <App/>
    </Auth0Provider>,
    document.getElementById('root')
);
