import React from 'react';

function UserHeader(props) {
  return(
    <React.Fragment>
    <div className='background-img-container'>
      <div className='background-img'>
        {
          (!props.user.backgroundImg || props.user.backgroundImg === 'none') ?
          <div className='black-background'></div> :
          <img src={require(`../../../uploads/${props.user.backgroundImg}`)} className='background-img' alt='backgroundImg'/>
        }
      </div>
      <img src={require(`../../../uploads/${props.user.avatar}`)} className='avatar-img avatar-position' alt='avatar'/>
    </div>
    <div className='user-name'><h2>{props.user.name} {props.user.surname}</h2></div>
    </ React.Fragment>
  )
}

export default UserHeader;
