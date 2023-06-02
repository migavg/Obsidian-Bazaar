import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

// Create a new context for the store
const StoreContext = createContext();
const { Provider } = StoreContext;

// Create a StoreProvider component that wraps the entire application and provides the store context
const StoreProvider = ({ value = [], ...props }) => {
  // Use the useProductReducer hook to get the state and dispatch function
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: "",
  });

  // Render the Provider component from the StoreContext, providing the state and dispatch as the value
  return <Provider value={[state, dispatch]} {...props} />;
};

// Custom hook to easily access the store context
const useStoreContext = () => {
  return useContext(StoreContext);
};

// Export the StoreProvider and useStoreContext for other components to use
export { StoreProvider, useStoreContext };
