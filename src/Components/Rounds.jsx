import React from 'react'
import "./Rounds.css"
import { useNavigate } from 'react-router-dom'

const Rounds = () => {
    const nav = useNavigate();
    const gotogame =(roundnum)=>{
        sessionStorage.setItem('rounds', roundnum);
      nav('/rps');
    }

    return (
        <div className='menu-fullscreen'>
        <div className="menu-box">
                <h1>Select Rounds</h1>
                <div className="round-container">
                <div onClick={()=>{gotogame(3)}}>Best of 3</div>
                <div onClick={()=>{gotogame(5)}}>Best of 5</div>
                <div onClick={()=>{gotogame(7)}}>Best of 7</div>
                </div>
            </div>
        </div>
    )
}

export default Rounds
