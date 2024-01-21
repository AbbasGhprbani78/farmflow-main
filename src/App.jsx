import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyProvider } from './components/RoleContext';
import './Style/App.css'

// for running the project what you need is to replace the current url with url you have taken into consideration and also run the npm run build .

export const IP = 'https://Farmflow.ariisco.com';



export default function App() {
  let router = useRoutes(routes);

  return (
    <>
      <MyProvider>
        {router}
      </MyProvider>
    </>
  );
}
