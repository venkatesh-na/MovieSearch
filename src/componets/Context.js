import React , { useState,useEffect,useContext, useCallback } from "react"
const AppContext = React.createContext()

const AppProvider = ({children})=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [text,setText] = useState("spider")
    const [resultStatus,setResultStatus] = useState(false)
    const fetchData = useCallback(async ()=>{
        setLoading(true)
        try
        {
            const response = await fetch(`https://www.omdbapi.com/?s=${text}&apikey=30cb0b35&`)
            const data = await response.json()
            const {Search} = data
            if(Search == undefined)
            {
            setData([])
            setLoading(false)
            setResultStatus(true)
            }
            else
            {
            setData(Search)
            console.log(Search,response)
            setLoading(false)
            setResultStatus(false)
            }
        }
        catch(error)
        {
            console.log(error)
        }
    },[text])
    useEffect(()=>{
        fetchData()
    },[fetchData])

    return (
        <AppContext.Provider value = {{text,setText,data,loading,setLoading,resultStatus}}>
            {children}
        </AppContext.Provider>
    )
}
const useGlobalContext = ()=>{
    return useContext(AppContext)
}
export {AppProvider,useGlobalContext};