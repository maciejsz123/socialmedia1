import React from 'react';
import { Link } from "react-router-dom";
import './mainPage.sass';

function MainPage() {

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" className='a-color'>home</Link>
          </li>
          <li>
            <Link to="/posts" className='a-color'>posts</Link>
          </li>
          <li>
            <Link to="/chat" className='a-color'>chat</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default MainPage;
