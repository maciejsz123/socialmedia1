import React from 'react';
import { connect } from 'react-redux';
import './imagesSection.sass'
import {Link} from 'react-router-dom';

function ImagesSection(props) {
  const images = props.users.filter( u => u._id === props.user._id)
    .map( u => u.gallery)
    .flat()
    .filter( (img, i) => i < 3)
    .map( (img, i) => (
      <img key={i}
        src={require(`../../../uploads/${img}`)}
        alt='img'
      />
    ));

  return(
    <div>
      <Link to={`/user/${props.user._id}/gallery`}>show all images</Link>
      <div className='img-section'>
        {images}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users.users
})

export default connect(mapStateToProps, {})(ImagesSection);
