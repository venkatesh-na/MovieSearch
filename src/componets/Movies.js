import React from "react";
import { useGlobalContext } from "./Context";
import { Link } from "react-router-dom"
import Loading from "./Loading";
const Movies = ()=>{
    const {data,loading,resultStatus,text} = useGlobalContext()
    if(loading)
    {
        return (
            <Loading/>
        )
    }
    else if(resultStatus)
    {
        return (
            <div className = "loading-container">
                <h1>{`No Result Found for "${text}"`}</h1>
            </div>
        )
    }
    else
    {
    return (
        <section className = "movies-container">
            <div className = "inner-movies-container">
                {data && data.map((item,index)=>{
                    const {Poster,Type,Title,imdbID} = item
                    return (
                        <Link key = {index} to = {`/detail/${imdbID}`}>
                        <article key = {imdbID}>
                            <div className = "img-container">
                                    <img src = {Poster} alt = {Title}/>
                            </div>
                            <div className = "info-container">
                                <p>{Title}</p>
                            </div>
                        </article>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
            }
}
export default Movies;