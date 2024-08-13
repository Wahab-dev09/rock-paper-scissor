import React from 'react'
import "./UserName.css"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UserName = () => {
  const nav = useNavigate();
    const [error, seterror] = useState({})
    const HandleSubmit =(e)=>{
    e.preventDefault();
    const formdata = new FormData(e.target);
    const formobj = Object.fromEntries(formdata.entries());
    const errors = {};
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;

    if (!formobj.username) {
      errors.username = "Username is required";
    } else if (formobj.username.length > 8) {
      errors.username = "Max 8 charaters allowed";
    }else if (formobj.username.length < 4) {
      errors.username = "Must be 4 charaters long";
    }else if (!usernameRegex.test(formobj.username)) {
      errors.username =`Only letters, numbers, hyphens and underscores allowed`;
    }

    if (Object.keys(errors).length > 0) {
      seterror(errors);
    } else {
      seterror({});
      sessionStorage.setItem('username', formobj.username);
      nav('/rounds');
  }
}

useEffect(() => {
  console.log(error);
}, [error])

  return (
    <div className='menu-fullscreen'>
        <div className="menu-box">
            <form onSubmit={HandleSubmit} className="user-det">
                <span>Enter your Name</span>
                <input className={error.username?"field-error":"field"} type="text" placeholder='Your Name' name='username'/>
                <img fetchpriority='high' decoding='async' className='bot-img' src={import.meta.env.BASE_URL + "bot2.webp"} alt=""/>
                <div className="err-btn-box">
                <button type='submit' value='submit'>Next</button>
                <span>{error.username}</span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UserName
