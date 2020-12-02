import React from 'react'
// import axios from 'axios'

/**
 * component for every author in landing page's popular author section
 * 
 */



function AuthorThumbnail(props){
    return(
        <div className='authorThumbnail'>
            <div className="authorThumbnailData">
                <h3>{(props.data.name).toUpperCase()}</h3>
                <h4>Likes: {props.data.likeCount}</h4>
                <h4>Blogs: {props.data.blogs}</h4>
            </div>
        </div>
    )
}

export default AuthorThumbnail