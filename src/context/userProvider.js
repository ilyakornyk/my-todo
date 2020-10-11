import React, { useState, useEffect, createContext } from 'react';
import { auth } from 'components/firebase/authen';

// Тут створити контекст і через контекст пркидувати юзера далі в компоненти
export const UserContext = createContext({ user: null });

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      setUser(user)
    });
  }, []);
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
