import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Menu.css"

const Menu = () => {
  const navigate = useNavigate();
  const gotogame =()=>{
    navigate('/username')
  }
  
  return (
    <div className='menu-fullscreen'>
        <div className="menu-box">
            <div className="menu-head">
            <span><span>R</span>OCK</span>
            <span>PAPER</span>
            <span>SCISSOR</span>
            <img fetchpriority='high' decoding='async' src={import.meta.env.BASE_URL + "/scissor-line3.webp"} alt="Scissor-line" />
            </div>
            <div className="second-box"> 
            <div className="img1box"><img loading='lazy' decoding='async' fetchpriority='low' className='menu-img1' src={import.meta.env.BASE_URL + "/menu-scissor.webp"} alt="Scissor" /></div>
            <p>The Ultimate Hand Showdown !</p>
            <button onClick={gotogame}>Play <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='white'><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="m9 17 8-5-8-5z"></path></svg></button>
              <div className="img2box"><img loading='lazy' decoding='async' fetchpriority='low' src={import.meta.env.BASE_URL + "/menu-rock.webp"} alt="Rock" /></div>
            </div>
        </div>
    </div>
  )
}

export default Menu
