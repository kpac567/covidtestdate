import React from 'react';
import Header from './Header';

class TopPage extends React.Component {
    render() {
        return (
            <div className='top-page'>
                <Header
                    redirect={this.props.redirect}
                    currentUserName={this.props.currentUserName}
                    logOut={this.props.logOut}
                    isLogIn={this.props.isLogIn}
                    currentEmail={this.props.currentEmail}
                    currentPassword={this.props.currentPassword}
                    handleChange={this.props.handleChange}
                    logIn={this.props.logIn}
                    err={this.props.err}

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

                    handleSubmit={this.props.handleSubmit}
                    toggleGender={this.props.toggleGender}
                    toggleLookingForGender={this.props.toggleLookingForGender}

                    users={this.props.users} 
                    delete={this.props.delete} 
                    likeUser={this.props.likeUser}
                    foundUsers={this.props.foundUsers}
                    />
            </div>
        )
    }
}

export default TopPage




