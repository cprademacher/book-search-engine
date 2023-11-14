import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

// eslint-disable-next-line react/prop-types, no-unused-vars
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    categories: [],
    currentCategory: "",
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { StoreProvider, useStoreContext };
