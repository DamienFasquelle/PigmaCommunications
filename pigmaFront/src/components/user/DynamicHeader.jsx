import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import Header from '../public/Header'
import UserHeader from './UserHeader';
import AdminHeader from '../admin/AdminHeader';


const DynamicHeader = () => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
        const user = jwtDecode(jwt);
        if (user.data.role === 1) {
            return <AdminHeader />;
        } else if (user.data.role === 2) {
            return <UserHeader />;
        }
    }
    return <Header />;
};

export default DynamicHeader;