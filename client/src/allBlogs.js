import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

import Header from './components/header'
import Footer from './components/footer'
import BlogThumbnail from './components/BlogThAllBlog'


/**
 * 
 * @param {props from parent component} props 
 * All blog page, contains thumbnail for all blogs 
 */
function AllBlogs(props) {
    const [blogs, setBlogs] = useState(<h1>Loading....</h1>)
    const { isAuthenticated, user, loginWithRedirect } = useAuth0()

    useEffect(() => { // this hook is same as componetDidMount function in class based componet

        axios.get('/fetchAllBlogs').then((response) => { // getting data for all blogs and 
            // making array of thumbnails for every blog
            if(response.data.length >= 1)
            {
                let newBlogList = response.data.map((blogData, index) => {
                    return <BlogThumbnail blogData={blogData} key={index} history={props.history} />
                })
                setBlogs(newBlogList)
            }
        })
    })
    if(isAuthenticated)
    {
        return (
            <div>
                <Header history={props.history} />
                <div className='allBlogContent'>
                    {blogs}
                </div>
            </div>
        )
    }
    else
        loginWithRedirect()
}

export default AllBlogs