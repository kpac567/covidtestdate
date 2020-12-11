import React from 'react';
import Title from './Title';
import LogIn from './Login';
import SignUp from './Signup';
import ListUsers from './ListUsers';

import { HashRouter, Route, Link } from "react-router-dom";


class Header extends React.Component {
    render() {
        return (
            <HashRouter basename='/'>
                <div className="header">
                    <div>
                        <h1><Link to='/'><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-half" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 1.314C3.562-3.248-7.534 4.735 8 15V1.314z" />
                            <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg> &nbsp;
                            Dating App</Link>
                        </h1>
                    </div>

                    <nav>
                        <ul>
                            <li><a href="#">ABOUT US</a></li>
                            <li><a href="#">SAY HELLO</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><Link to='/users'>USERS</Link></li>
                            {!this.props.isLogIn ?
                                <React.Fragment>
                                    <li><Link to='/login'>LOG IN</Link></li>
                                    <li><Link to='/signup'>SIGNUP</Link></li>
                                </React.Fragment>
                                : <React.Fragment>
                                    <li>{this.props.currentUserName}</li>
                                    <li onClick={this.props.logOut}>LOG OUT</li>
                                </React.Fragment>
                            }

                        </ul>
                    </nav>
                </div>
              
                
                    <Route exact path="/" component={Title} />
                   
                    <Route path="/login">
                        <LogIn
                            redirect={this.props.redirect}
                            currentEmail={this.props.currentEmail}
                            currentPassword={this.props.currentPassword}
                            handleChange={this.props.handleChange}
                            logIn={this.props.logIn}
                            isLogIn={this.props.isLogIn}
                            err={this.props.err}
                           />
                    </Route>
                    <Route path="/signup">
                        <SignUp
                            redirect={this.props.redirect}
                            userName={this.props.userName}
                            email={this.props.email} age={this.props.age}
                            location={this.props.location} image={this.props.image}
                            password={this.props.password}
                            female={this.props.female}
                            male={this.props.male}
                            countries={this.props.countries}

                            lookingForAgeFrom={this.props.lookingForAgeFrom}
                            lookingForAgeTo={this.props.lookingForAgeTo}
                            lookingForFemale={this.props.lookingForFemale}
                            lookingForMale={this.props.lookingForMale}
                           

                            handleChange={this.props.handleChange}
                            handleSubmit={this.props.handleSubmit}
                            toggleGender={this.props.toggleGender}
                            toggleLookingForGender={this.props.toggleLookingForGender} />
                    </Route>
                {/* ALL USERS */}
                <Route path="/users">
                        <ListUsers 
                            users={this.props.users} 
                            delete={this.props.delete} 
                            isLogIn={this.props.isLogIn}
                            likeUser={this.props.likeUser}
                            foundUsers={this.props.foundUsers}
                            />
                    </Route>
                
                </HashRouter>
        )
    }
}

export default Header

