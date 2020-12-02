import React from "react";
import { useAuth0 } from '@auth0/auth0-react'


/**
 * 
 * @param {propeties from parent} props 
 * Header for all pages except landing page
 */
function Header(props) {
    const { isAuthenticated, loginWithPopup, logout } = useAuth0()
    return (
        <div className="header">
            <div className="headingName">Contentwise</div>
            <div className='headingLinks'>
                <div className='headerLink' onClick={() => { props.history.push('/') }}>
                    Home
                </div>
                <div
                    className='headerLink'
                    onClick={() => {
                        if (isAuthenticated)
                            props.history.push('/allBlogs')
                        else
                            loginWithPopup()
                    }}
                >
                    All Blogs
                </div>
                <div
                    className='headerLink'
                    onClick={() => {
                        if (isAuthenticated)
                            props.history.push('/newBlog')
                        else
                            loginWithPopup()
                    }}
                >
                    + New Blog
                </div>
                <div
                    className='headerLink'
                    onClick={() => {
                        if (isAuthenticated) {
                            logout()
                        }
                        else
                            loginWithPopup()
                    }}
                >
                    {isAuthenticated ? 'Logout' : 'Login'}
                </div>
            </div>
        </div>
    );
}

export default Header;
