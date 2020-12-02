import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import ThumsUp from './thumsup'
import ThumsDown from './thumsdown'

// thumbnai for all blogs on 'All Blog' page


// TODO: improve style of this componet

/**
 * 
 * @param {proprties from parent componets} props 
 */
function BlogTH(props) {
    var blog = props.blogData.body.substr(0, 195) 
    if(blog.length >= 190)
        blog += '...'
    var heading = props.blogData.title.substr(0, 33)
    if(props.blogData.title.length > 33)
        heading += '...'
    // we will show only first 195 charaters of the 

    var addr = '/blog/'+props.blogData._id
    const {isAuthenticated, loginWithPopup} = useAuth0()

    return (
        <div 
            className='blogTh' 
            id={props.id} 
            name={props.blogData._id}
            
            /**
             * fucntion to handel login if not logged in 
             * else to redirect to that blog's page 
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
                
            <h3 className='blogThHeading'>{heading}</h3>
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