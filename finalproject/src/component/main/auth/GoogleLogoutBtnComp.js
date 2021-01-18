import React , { Component } from 'react';
import reactDOM from 'react-dom';
import { GoogleLogout } from 'react-google-login';


class GoogleLogoutBtnComp extends Component
{
    render() {
        const responseGoogle = (response) => {
            console.log(response);
        }

        const onSuccess = (res) => {
            alert('Logout 되었습니다');
        };

        return (
            <>
            <br />
            <br />
            <GoogleLogout
                clientId="256166181377-83u2uuteqgosooa3um2i3o36ho1325md.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
            </>
        );
    }
}

export default GoogleLogoutBtnComp;