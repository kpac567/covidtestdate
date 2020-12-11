import React, { Component } from 'react'
import TopPage from './components/TopPage';

import Footer from './components/Footer';
import usersService from './services/usersService';
import sessionService from './services/session';
import './App.css';
import countries from "countries-list";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // Sign up
            email: '',
            userName: '',
            age: 18,
            image: '',
            location: '',
            password: '',
            female: false,
            male: true,
            lookingForFemale: true,
            lookingForMale: false,
            lookingForAgeFrom: 18,
            lookingForAgeTo: 30,

            redirect: '/',
            // authentication
            currentEmail: '',
            currentPassword: '',
            currentUser: '',
            isLogIn: false,
            err: '',
            users: [],

            // main page
            foundUsers: 0
        }
    }

    // handle Change
    handleChange = (event) => {
        event.target.id !== "image" ? this.setState({ [event.target.id]: event.target.value })
            : this.setState({ [event.target.id]: event.target.files });
    }

    // toggleGender
    toggleGender = () => {
        this.setState({
            female: !this.state.female,
            male: !this.state.male,
        });
    }

    // toggle LookingForGender
    toggleLookingForGender = () => {
        this.setState({
            lookingForFemale: !this.state.lookingForFemale,
            lookingForMale: !this.state.lookingForMale
        })
    }
    // GET LOCATION
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    // GET POSITION AND CREATE NEW USER
    showPosition = async (position) => {
        // get position
        this.setState({
            position: {
                lat: position.coords.latitude,
                long: position.coords.longitude
            }
        });

        const newOne = await this.createNewUser();

        newOne.position = this.state.position; // add user's position

        // add newData to db
        await usersService.create(newOne);

        this.setState({
            email: '',
            userName: '',
            age: 18,
            image: '',
            location: '',
            password: '',
            female: false,
            male: true,
            redirect: '/login'
        });
    }

    // CREATE NEW USER
    createNewUser = async () => {
        const image = await this.uploadImage();

        this.setState({
            image: image.url
        })

        // set information of new account
        const newOne = {
            email: this.state.email,
            userName: this.state.userName,
            age: parseInt(this.state.age),
            image: this.state.image,
            location: this.state.location,
            lookingForAgeFrom: this.state.lookingForAgeFrom,
            lookingForAgeTo: this.state.lookingForAgeTo,
            password: this.state.password
        };

        // set gender
        this.state.female ? newOne.gender = "Female" : newOne.gender = "Male";
        this.state.lookingForFemale ? newOne.lookingForGender = "Female" : newOne.lookingForGender = "Male";

        return newOne
    }

    // UPLOAD IMAGE
    uploadImage = async () => {
        const file = Array.from(this.state.image)[0];

        const formData = new FormData();

        formData.append('file', file);

        const image = await usersService.uploadImage(formData);

        return image
    }

    // handle submit
    handleSubmit = (event) => {
        event.preventDefault();
        this.getLocation();
    }

    //  Fetch Users
    fetchUsers = async () => {
        const users = await usersService.getAll();
        const filterdUsers = users.filter(user => user.gender === this.state.currentUser.lookingForGender 
            && user.age >= this.state.currentUser.lookingForAgeFrom 
            && user.age <= this.state.currentUser.lookingForAgeTo)
        this.setState({ 
            users: filterdUsers,
            foundUsers: filterdUsers.length
        });
      
        return filterdUsers;
    }

    // Get all countries
    getAllCountries = () => {
        const allCountries = [];
        for (let key in countries.countries) {
            allCountries.push(countries.countries[key]);
        }
        this.setState({
            countries: allCountries
        })
    }

    // CHECK AUTHENTICATION
    checkAuthentication = async () => {
        const result = await sessionService.checkAuthentication(); // check user loged in or not
        if (result.isLogIn) {
            const currentUser = localStorage.getItem('currentUser');
            this.setState({
                isLogIn: true,
                currentUser: JSON.parse(currentUser)
            })
            this.fetchUsers();
        }
    }
    // WHEN PAGE IS LOADED
    componentDidMount() {
        this.checkAuthentication();
        this.getAllCountries();
    }

    // delete data
    deleteData = async (event) => {
        const id = event.currentTarget.getAttribute('a-key');
        await usersService.delete(id);
        const users = this.state.users;
        const index = users.findIndex(item => item._id === id);
        this.setState({
            users: [
                ...users.slice(0, index),
                ...users.slice(index + 1)
            ]
        })
    }

    // LOG IN
    logIn = async (event) => {
        event.preventDefault();
        const user = {
            email: this.state.currentEmail,
            password: this.state.currentPassword
        };
        const currentUser = await sessionService.logIn(user);
        if (!currentUser.err) {
            // set local storage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            this.setState({
                currentEmail: '',
                currentPassword: '',
                isLogIn: true,
                currentUser: currentUser,
                redirect: '/users',
            })
            await this.fetchUsers();
        } else {
            this.setState({
                err: currentUser.err
            })
        }

    }

    logOut = async () => {
        await sessionService.logOut();
        // reset localStoreage
        localStorage.clear();
        this.setState({
            isLogIn: false,
            currentUser: '',
            redirect: '/',
            err: '',
            foundUsers: 0,
            users: []
        })
    }

    // CALCULATE DISTANCE
    distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === "K") { dist = dist * 1.609344 }
            if (unit === "N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    render() {
        const { userName, email, age, location,
            image, password, female, male, countries,
            lookingForAgeFrom, lookingForAgeTo, lookingForFemale,
            lookingForMale, currentEmail, currentPassword, isLogIn,
            currentUser, redirect, err, foundUsers } = this.state;
        return (
            <React.Fragment >

                {/* Top Page */}
                <TopPage
                    isLogIn={isLogIn}
                    currentUserName={currentUser.userName}
                    logOut={this.logOut}
                    currentEmail={currentEmail}
                    currentPassword={currentPassword}
                    logIn={this.logIn}
                    err={err}

                    redirect={redirect}
                    userName={userName}
                    email={email} age={age}
                    location={location} image={image}
                    password={password}
                    female={female}
                    male={male}
                    countries={countries}

                    lookingForAgeFrom={lookingForAgeFrom}
                    lookingForAgeTo={lookingForAgeTo}
                    lookingForFemale={lookingForFemale}
                    lookingForMale={lookingForMale}

                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    toggleGender={this.toggleGender}
                    toggleLookingForGender={this.toggleLookingForGender}

                    users={this.state.users}
                    delete={this.deleteData}
                    foundUsers={foundUsers}
                />


                <Footer />
            </React.Fragment >
        )
    }
}

export default App