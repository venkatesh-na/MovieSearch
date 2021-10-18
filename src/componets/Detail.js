import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import { useGlobalContext } from "./Context"
import Loading from "./Loading"
const Detail = ({match})=>{
    const {loading,setLoading} = useGlobalContext()
    const [detailData,setDetailData] = useState([])
    const fetchData = async ()=>{
        setLoading(true)
        try
        {
        const response = await fetch(`http://www.omdbapi.com/?i=${match.params.id}&apikey=30cb0b35`)
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
                return (
                    <section key = {imdbID}>
                        <article className = "detail-image-container">
                            <img src = {Poster} alt = {Title}/>
                            <div>
                                <h1>{Title}</h1>
                                <p className = "type">Type: {Type}</p>
                                <p className = "release">Release date: {Released}</p>
                                <p className = "rating">Rating : {imdbRating}/10</p>
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