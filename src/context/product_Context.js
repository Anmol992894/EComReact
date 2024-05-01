import { Children, createContext } from "react";

const appContext=createContext();

const AppProvider=({children})=>{
    return<appContext.Provider>
        {children}
    </appContext.Provider>
};

export {AppProvider};
