import React from "react"
import { useGlobalContext } from "./Context";
const Form = ()=>{
    const { text,setText } = useGlobalContext()
    return (
            <section className = "form-container">
                <form>
                    <input value = {text} onChange = {(e)=>setText(e.target.value)} type = "text" placeholder = "Search for Movies"/>
                </form>
            </section>
    )
}
export default Form;