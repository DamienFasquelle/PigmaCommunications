import React from 'react';
import Cookies from 'js-cookie';
import Header from '../public/Header'
import UserHeader from './UserHeader';



const DynamicHeader = () => {
    const jwt = Cookies.get('jwt');
    if (!jwt) {
        return <Header />;
    } else {
        return <UserHeader />;
    }
}


export default DynamicHeader;