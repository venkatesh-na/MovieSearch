import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import { FaStar } from "react-icons/fa"
import { useGlobalContext } from "./Context"
import Loading from "./Loading"
const Detail = ({match})=>{
    const {loading,setLoading} = useGlobalContext()
    const [detailData,setDetailData] = useState([])
    const fetchData = async ()=>{
        setLoading(true)
        try
        {
        const response = await fetch(`https://www.omdbapi.com/?i=${match.params.id}&apikey=30cb0b35`)
        const data = await response.json()
        setLoading(false)
        setDetailData([data])
        }
        catch(error)
        {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    if(loading)
    {
        return (
            <Loading/>
        )
    }
    else
    {
    return (
        <main className = "detail-container">
            {detailData.map((item,index)=>{
                const {Title,Released,Genre,Director,Writer,Actors,Plot,Poster,imdbRating,imdbID,Type,totalSeasons} = item
                const GenreArray = Genre.split(",")
                const h = imdbRating/2;
                let starArray = []
                for(let i = 1; i<=parseInt(h); i++)
                {
                    starArray.push(i)
                    if(i == parseInt(h))
                    {
                        starArray.push(h)
                    }
                }
                console.log(starArray)
                return (
                    <section key = {imdbID}>
                        <article className = "detail-image-container">
                            <img src = {Poster} alt = {Title}/>
                            <div>
                                <h1>{Title}</h1>
                                <p className = "type">Type: {Type}</p>
                                <p className = "release">Release date: {Released}</p>
                                <div className = "rating">
                                    Rating : 
                                    <div className = "star-container">
                                    {starArray.map((e)=>{
                                        let number = e
                                        return (
                                            <div style = {{display:"inline-block"}}>
                                            <p style = {{width:number.toString().length > 2 ? `${(e/5)*100}%` : ""}}>
                                                <FaStar className = "star"/>
                                            </p>
                                            </div>
                                        )}
                                        )}
                                        </div>
                                    <span>{imdbRating}/10</span>
                                </div>
                            </div>
                        </article>
                        <article className = "detail-info-container">
                            <div className = "genre-container">
                                <h2>Genre :</h2>
                                <div>
                                    {GenreArray.map((e)=><p>{e}</p>)}
                                </div>
                            </div>
                            <div className = "plot-container">
                                <h2>Plot</h2>
                                <p>{Plot}</p>
                            </div>
                            <div>
                                <p><span>Writer:</span> {Writer}</p>
                                <p><span>Actors:</span> {Actors}</p>
                                <p><span>Director:</span> {Director}</p>
                                {Type == "series" ? <p><span>totalSeasons:</span>{totalSeasons}</p> : ""}
                            </div>
                            <Link to = "/">
                            <button className = "back">Back To Search</button>
                            </Link>
                        </article>
                    </section>
                )
            })}
        </main>
    )
        }
        }
export default Detail;