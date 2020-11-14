import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
// get a reference to the auth object after init. Then figure out if user is signed in, then print auth status on screen
class GoogleAuth extends React.Component {
    // null because we initially dont know if the user has signed in or not
    // state = { isSignedIn: null };
    componentDidMount() {
        // the () is a callback function for when the process is complete
        window.gapi.load('client:auth2', () => {
            // passing an object that has our client id
            // then specify the scopes we want to load up when user goes through oauth process. init to initialise
            // https://developers.google.com/identity/sign-in/web/reference
            window.gapi.client
                .init({
                    clientId:
                        '60101665480-rv31uc4bt0evvlgnscevetccmmao0lha.apps.googleusercontent.com',
                    scope: 'email',
                    // after library has successfully been initailised .then gets invoked. We will begin by getting a reference to that auth object and saving a refence to it on the component. gapi.auth2.getAuthInstance() Returns the GoogleAuth object.
                })
                // first we initialise the library, then we asign the auth instance to the this.auth, then update our auth state in the redux store, then wait for the auth status to change sometime in the future(listen)
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    // to get the updated state so that component will rerender and print auth status on the screen. A property on .auth object (isSignedIn)
                    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                    // run the below, to check the users current status
                    this.onAuthChange(this.auth.isSignedIn.get());
                    // add event listner to see if user us signed in. onAuthChange defined below
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }
    // create arrow function so that its instance is bound to the component. The following will be called everytime our authentication changes. It gets called by a boolean
    onAuthChange = (isSignedIn) => {
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() }); this was component level state, now we want to setup redux so passed in isSigednIn as an argument plus:
        // if (action creator === true) then call ...
        if (isSignedIn) {
            // To get the current users Google Id this.auth.currentUser.get().getId(). Now when we call (isSigedIn) action creator we're going to also pass on the idea of the user who has signed.So now we need to make sure that we open up our action creator as well received this ID as an argument, and pass it through to the reducer, by assigning this ID to the action object as a payload property, now we go add payload to action creator
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };
    // HELPER METHODS
    // will be an arrow function because it will be a call back. Want to access auth instance
    onSignInClick = () => {
        this.auth.signIn();
    };
    onSignOutClick = () => {
        this.auth.signOut();
    };
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    onClick={this.onSignOutClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }
    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

// __proto__ (get is in this object), also another one called listen (which will be envoked everytime users authentiation status changes)

// call it with the state object, return an object. Now the value of SignedIn is going to be true, false or null
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
