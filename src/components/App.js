import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import UsersList from './UsersList';
import styles from '../css/app.css';



class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className={styles.app}>
        <div>
          <NavBar />
          <div className={styles.container}>
            <UsersList />
            <Link to='/add-user'>
              <button>Ajouter un utilisateur</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}



export default App;
