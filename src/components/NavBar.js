import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/navbar.css';

class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className={styles.container}>
        <Link to='/'><button>Homepage</button></Link>
      </div>
    );
  }
}



export default NavBar;
