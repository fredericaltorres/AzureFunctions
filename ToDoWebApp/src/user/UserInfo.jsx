import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from './userActions';

class UserInfo extends Component {

    constructor() {
        console.log(`Component UserInfo.constructor()`);
        super();
    }
    loadUser = () => {
        console.log(`Component UserInfo.loadUser() -- User clicked on 'Load user' button`);
        this.props.fetchUserAction();
    }
    render() {
        const { isUserLoading, userData } = this.props;
        console.log(`Component UserInfo.render(), isUserLoading:${isUserLoading}, typeof(userData):${typeof(userData)}, userData:${userData}`);

        if (isUserLoading) {

            return ( <div>Loading user...</div> );
        }
        else {
            
            return (
                <div>
                    <div>{JSON.stringify(userData)}</div>
                    <br/>
                    <button onClick={this.loadUser}>Load User</button>
                </div>
            );
        }
    }
}

UserInfo.defaultProps = {
    userData: '[No user]',
    isLoading : false,
};

const mapStateToProps = function(state) {
    const m = {
        userData: state.user.userData,
        isUserLoading: state.user.isLoading,
    };
    console.log(`Component UserInfo.mapStateToProps() state:${JSON.stringify(state)} return ${JSON.stringify(m)}`);
    return m;
}

const mapDispatchToProps = {
    userDataReceived: userActions.userReceivedAction,
    setIsLoading:     userActions.userRequestStarted,
    fetchUserAction:  userActions.fetchUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
