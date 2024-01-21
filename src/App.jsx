
import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyProvider, useMyContext } from './components/RoleContext';
import './Style/App.css'
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
