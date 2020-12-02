import React from 'react'


/**
 *  
 * @param {properties from parent componet} props 
 * thumbnail for each trending topic in hompage
 */
function TopicThumbnail(props){
    return(
        <div className='topicThumbnail'>
            <span className='topicThumbnailHash'>#</span>
            <span className='topicThumbnailContent'>{props.topicName}</span>    
        </div>
    )
}

export default TopicThumbnail