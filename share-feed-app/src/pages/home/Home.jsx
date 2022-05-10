import axios from "axios";
import { useState } from "react";
import Header from "../../components/header/Header";
import "./home.css";

export default function Home(){
    const[accesstoken,setAccesstoken] = useState("");
    const[file,setFile] = useState(null);
    const[message,setMessage] = useState("");
    const [postid,setPostid] = useState("");
    const[postmsg,setPostmsg] = useState("");
    const[posturl,setPosturl] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // if(file){
        //     console.log(file);
        //     setPosturl(`https://graph.facebook.com/me/photos?access_token=${accesstoken}
        //     &url=${file.name}&message=${message}`)
        // }else{
        //     setPosturl(`https://graph.facebook.com/me/feed?access_token=${accesstoken}
        //     &message=${message}`)
        // }
        setPosturl(`https://graph.facebook.com/me/feed?access_token=${accesstoken}
        &message=${message}`)
        try{
            const res = await axios.post(`${posturl}`)
            setPostid(res.data.id);
            setPostmsg(" Feed Posted Successfully....")
        }catch(err){
            console.log(err);
            setPostmsg(" Feed Post Unsuccessful...")
        }
    }

    const handleReset = async (e)=>{
        e.preventDefault();
        window.location.replace("/");
    }
    
    return(
        <>
        <Header />
        <div className="home">
                <div className="feedSuccess">
                    <span className="successMsg"> {postmsg} </span>
                    {postid!=="" && (
                        <a href={`https://www.facebook.com/${postid}`} className="feedLink" 
                        style={{textDecoration: "none"}}>
                            Click here to get the Feed Link
                        </a>
                    )}
                </div>
            <form className="feedForm" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="feedFormGroup">
                    <input 
                        type="text" 
                        id="feedInput" 
                        placeholder="Your Facebook AccessToken" 
                        className="feedInput" 
                        autoFocus={true}
                        required={true}
                        onChange={e=>setAccesstoken(e.target.value)}
                    />
                    {file && (
                        <img src={URL.createObjectURL(file)} 
                            alt=""
                            className="feedImage" 
                        />
                    )}
                    {!file && (
                        <img 
                        src="data:image/png;base64,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" 
                        alt="" 
                        className="feedImage" 
                    />
                    )}
                    
                    <label htmlFor="fileInput">
                        <i className="feedIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display: "none"}} onChange={e=>setFile(e.target.files[0])}/>
                </div>
                <div className="feedFormGroup">
                    <textarea 
                        type="text" 
                        placeholder="Your Feed description..." 
                        className="feedInput"
                        onChange={e=>setMessage(e.target.value)} > 
                    </textarea>
                </div>
                <button className="feedSubmit" type="submit">Share Feed</button>
                <button className="feedReset" type="reset">New Feed</button>
            </form>
        </div>
        </>
    )
}