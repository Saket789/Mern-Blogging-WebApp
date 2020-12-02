import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'


import Header from './header'
import Footer from './footer'
import ThumsUp from './thumsup'
import ThumsDown from './thumsdown'



// indivisual page for ever blog with expanded content 


function changeDateFormate(addedOn) {
    // let addedOn = x.data.addedOn
    let y = +(addedOn.substr(0, 4))
    let m = +(addedOn.substr(5, 2))
    let d = +(addedOn.substr(8, 2))
    let date = new Date(y, m - 1, d)
    let options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    let day = (date.toLocaleDateString('en-us', options))
    return day
}

function Blog(props) {

    const { isAuthenticated, user } = useAuth0()
    const blogId = props.match.params.blogId
    const [title, setTitle] = useState('Loading.....')
    const [body, setBody] = useState('')
    const [addedOn, setAddedOn] = useState('')
    const [author, setAuthor] = useState('..')
    const [likes, setLikes] = useState('')
    const [dislikes, setDislikes] = useState('')
    const [tags, setTags] = useState([])
    const [tagsWithStyle, setTagsWithStyle] = useState([])

    let userId = ''
    if (isAuthenticated)
        userId = user.sub
    useEffect(() => {
        if (isAuthenticated)
            userId = user.sub
    }, [isAuthenticated])

    // TODO: add like and dislike buttons and there backend logic 
    function likePost(blogId, userId) {
        const data = {
            userId, blogId
        };
        const url = '/like'
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            url
        };
        axios(options).then(res => {
            if (res.data.likes !== -1) {
                setLikes(res.data.likes)
                setDislikes(res.data.dislikes)
            }
        })
    }

    function disLikePost(blogId, userId) {
        const data = {
            userId, blogId
        };
        const url = '/dislike'
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            url
        };
        axios(options).then(res => {
            if (res.data.likes !== -1) {
                setLikes(res.data.likes)
                setDislikes(res.data.dislikes)
            }
        })
    }



    useEffect(() => {
        axios.get('/getBlog/' + blogId)
            .then((x) => {

                let day = changeDateFormate(x.data.addedOn)

                setTitle(x.data.title)
                setBody(x.data.body)
                setAddedOn(day)
                setAuthor(x.data.author)
                setLikes(x.data.likes)
                setDislikes(x.data.dislikes)
                setTags(x.data.tags)
                setTagsWithStyle(
                    x.data.tags.map((tag, index) => {
                        return <div className='blogpage-tag' key={index}>{tag}</div>
                    })
                )
            })

    }, [])



    return (
        <>
            <Header history={props.history} />{/* we need to send history property so that we can 
                                                       redirect from chied compont too  else we can do this
                                                       from componts in direct child fo Router tag only*/}
            <div className="blogPage">
                <h1>{title}</h1>
                <p>{addedOn}</p>
                <div>{tagsWithStyle}</div>
                <div className="blogPageBody">{body}</div>
            </div>
            <div className="blogInfo">
                <div>
                    By: {author}

                    <div className='like-button' onClick={() => likePost(blogId, userId, tags)}>
                        <ThumsUp /> {likes}
                    </div>

                    <div className='dislike-button' onClick={() => disLikePost(blogId, userId, tags)}>
                        <ThumsDown /> {dislikes}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )

}

export default Blog