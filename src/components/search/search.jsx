import React, { useState } from 'react';
import { connect } from 'react-redux';
import './search.sass';
import { Link } from 'react-router-dom';

function Search(props) {
  const [search, setSearch] = useState('');
  const filteredUsers = props.users.filter( u => u.name.toLowerCase().includes(search.toLowerCase().trim()) || u.surname.toLowerCase().includes(search.toLowerCase().trim()))
    .filter( (u,i) => i < 5)
    .map( u => (
      <div key={u._id}>
        <Link to={`/user/${u._id}`}>{u.name} {u.surname}</Link>
      </div>
    ));

  function display() {
    const doc = document.getElementById('filtered-data');
    doc.classList.toggle('d-none');
    doc.classList.toggle('d-block');
  }

  return (
    <div>
      <input type='text'
        value={search}
        placeholder='search'
        onChange={ e => setSearch(e.target.value)}
        onFocus={display}
        maxLength='20'
      />
      <div className='filtered-users d-none' id='filtered-data'>
        {filteredUsers.length ? filteredUsers : 'no items found'}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users.users
})

export default connect(mapStateToProps)(Search);
