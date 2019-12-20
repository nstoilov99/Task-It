import React from 'react';
import "./Profile.css"


const Profile = ({user}) => {




    return <div className="flip-card">
    <div className="flip-card-inner">
      <div className="flip-card-front">
      </div>
      <div className="flip-card-back">
        <h1>{user.username}</h1> 
        <p>{user.email}</p> 
        <p>{user.expiriance} exp.</p>
      </div>
    </div>
  </div>
       
}


export default Profile;