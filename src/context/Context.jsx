import  {useState, createContext } from "react";
import PropTypes from "prop-types";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

  const [input, setInput] = useState("");
  const [recentPromt, setRecentPromt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [ShowResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultdata, setResultdata] = useState("");



  const OnSent = async (prompt) => {
    await run(prompt);
  };

  const contextValue = {
    // Define your context values here if needed
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
