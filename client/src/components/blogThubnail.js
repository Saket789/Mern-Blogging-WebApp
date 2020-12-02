import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import ThumsUp from './thumsup'
import ThumsDown from './thumsdown'


/**
 * 
 * @param {properties from parent componet} props 
 * thumbnail for blog in landing page
 */

function BlogTH(props) {
    var blog = props.blogData.body.substr(0, 195) 
    if(blog.length >= 190)
        blog += '...'
    var heading = props.blogData.title.substr(0, 33)
    if(props.blogData.title.length > 33)
        heading += '...'
    var addr = '/blog/'+props.blogData._id
    const {isAuthenticated, loginWithPopup} = useAuth0()

    return (
        <div 
            className='blogThumbnail' 
            id={props.id} 
            name={props.blogData._id}
            
            
            /**
             * 
             * on click if loged in then sends to page of that blog
             * else pop up to login  
             *  
            */ 
           
            onClick={() => {
                if(isAuthenticated)
                {
                    props.history.push(addr)
                }
                else
                loginWithPopup()
            }}>
                
            <h3>{heading}</h3>
            <p>By: {props.blogData.author}</p>
            <ThumsUp /> {props.blogData.likes}
            <br />
            <ThumsDown /> {props.blogData.dislikes}
            <hr />
            <p>{blog}</p>
        </div>
    )
}

export default BlogTH