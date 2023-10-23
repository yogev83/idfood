import React from 'react';

// Define a type for the user data
export type User = {
  id: string;
  type: "unit | volunteer";
  activeRequest?: string;
  username?: string;
  unitname?: string;
};

// Define a type for the context value
type UserContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// Create a context with an initial value
export const UserContext = React.createContext<UserContextValue>({
  user: null,
  setUser: () => { 
    return {}
  }, // Initial setter does nothing
});
