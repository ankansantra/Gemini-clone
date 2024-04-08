import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    
    
    const [input,setInput] = useState(""); 
    const [recentPrompt, setRecentPrompt] = useState(""); 
    const[prevPrompts,setPrevPrompts] = useState([]); 
    const [showResult,setShowResult] = useState(false); 
    const [loading,setLoading] = useState(false);
    const [resultData, setResultData] = useState(""); 
     

    // Function to delay displaying each word in the response
    const delayPara = (index,nextWord) => {
        setTimeout(function(){
            setResultData(prev=>prev+nextWord)
        },75*index)

    }
     
    // Function to reset states for a new chat session
    const newChat = () => {
        setLoading(false)
        setShowResult(false);
    }
    
    // Function to handle sending user input
    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        // Checking if prompt is provided, if not, use input
        if (prompt !== undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt)

        } else{
            setPrevPrompts(prev=>[...prev,input]) // Storing input in prevPrompts
            setRecentPrompt(input)
            response = await runChat(input);
        }
         // Processing response for formatting
        let responseArray = response.split("**");
        let newResponse ="" ; 
        for(let i = 0; i < responseArray.length; i++){
            if(i===0 || i%2 !== 1){
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br/>");
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ") // Delaying display of each word
        }
        
         // Resetting loading state and clearing input
        setLoading(false)
        setInput("")
    }

  
    // Context value containing states and functions to be used by child components
    const contextValue= {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }
    // Providing context value to children components
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
} 

export default ContextProvider;
