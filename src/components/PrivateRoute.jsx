import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isManager } from './Utils';
import { useMyContext } from './RoleContext';
import { IP } from '../App';
import axios from 'axios';
import Loading from './Laoding/Loading';

export default function PrivateRoute({ children }) {
  const [Role, setRole] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const validateUser = async () => {
    const refresh = localStorage.getItem('refresh');

    const body = {
      refresh: refresh,
    };

    try {
      const response = await axios.post(`${IP}/login/refresh/`, body);

      if (response.status === 200) {
        window.localStorage.removeItem('access');
        window.localStorage.removeItem('uuid');
        window.localStorage.setItem('access', response.data.access);
        window.localStorage.setItem('uuid', response.data.uuid);
        setRole(response.data.role);
        setIsLoading(false)
      }

    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        sessionStorage.clear();
        window.location.href = '/login';
      }

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  const { sharedData } = useMyContext();
  const managerTrue = isManager(sharedData);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      {(managerTrue || Role) ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
