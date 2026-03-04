import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'

// Initialize Mirage JS only in development
const { makeServer } = await import('./mocks/server');
makeServer({ environment: 'development' });
console.log('🚀 Mirage JS server started');


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)