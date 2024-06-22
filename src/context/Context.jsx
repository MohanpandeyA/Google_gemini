/* eslint-disable react/prop-types */
import { useState, createContext } from "react";

import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPromt, setRecentPromt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [ShowResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultdata, setResultdata] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function(){
      setResultdata(prev=>prev+nextWord);
    },75*index)
  };

  const newChat =()=>{
    setLoading(false);
    setShowResult(false)
  }

  const OnSent = async (prompt) => {

    setResultdata("");
    setLoading(true);
    setShowResult(true);

    let response;
    if(prompt !== undefined){

      response =await run(prompt);
      setRecentPromt(prompt);
      
    }
    else{
      setPrevPrompt(prev=>[...prev,input])
      setRecentPromt(input)
      response =await run(input)
    }
    
    let responseArray = response.split("**");
    let newResponse= "";

    for (let i = 0; i < responseArray.length; i++) 
    {
      if(i===0 || i%2 !==1){
        newResponse+=responseArray[i];
      }
      else{
        newResponse+="<b>"+responseArray[i]+"</b>";
      }
    }
    let newResponse2 =newResponse.split("*").join("</br>")
    let newResponseArray=newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord =newResponseArray[i];
      delayPara(i,nextWord+" ")

  
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    // Define your context values here if needed
    prevPrompt,
    setPrevPrompt,
    OnSent,
    setRecentPromt,
    recentPromt,
    ShowResult,
    loading,
    resultdata,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
