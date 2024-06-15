import { createContext, useContext, useReducer } from "react";
import  reducer  from './reducers'

const PageContext = createContext();
const { Provider } = PageContext;

const PageProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    currentPage: "",
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const usePageContext = () => {
  return useContext(PageContext);
};

export { PageProvider, usePageContext };