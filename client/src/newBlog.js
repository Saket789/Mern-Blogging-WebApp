import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

import Header from './components/header'
import Footer from './components/footer'

/**
 * 
 * @param {props form parent componet} props 
 * 
 * TODO: 
 *      1. we have to add bootstrap in form
 *      2. we have to make a input field in which we can type topic's name
 *      3. a button which on click adds that topic in tags array and makes that input field clear
 *      4. print all tags in array on screent in read only mode (we can give a button to delete that too)
 */

function Blog(props) {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [author, setAuthor] = useState('')
    const [authorID, setAuthorID] = useState('')
    const [tagString, setTagString] = useState('')
    const [tagsArray, setTagsArray] = useState([])

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };


    useEffect(() => {
        setTagString(JSON.stringify({ tags: tags }))
        setTagsArray(tags.map((tag, index) => (
            <span key={index} className="tag">
                <span className='tag-title'>{tag}</span>
                <span className='tag-close-icon' onClick={() => removeTags(index)}>x</span>
            </span>
        )))

        if (isAuthenticated) {
            setAuthor(user.nickname)
            setAuthorID(user.sub)
        }
        // eslint-disable-next-line
    }, [tags, isAuthenticated])

    function handelChangeTitle(event) {
        setTitle(event.target.value)
    }

    function handelChangeBody(event) {
        setBody(event.target.value)
    }

    function addTag(e) {
        if (e.target.value !== '') {
            setTags([...tags, e.target.value])
            e.target.value = ''
        }
    }



    if(isAuthenticated)
    {
        return (
            <>
                <Header history={props.history} />
                <div className='new-blog'>
                    <h2>New Blog</h2>
                    <Form id='newBlogForm' action='/createNewBlog' method='Post'>
                        <input type='text' name='author' value={author} readOnly hidden />
                        <input type='text' name='authorID' value={authorID} readOnly hidden />
                        <FormGroup>
                            <Label>Title:</Label>
                            <Input type='text' name='title' value={title} onChange={handelChangeTitle} autoComplete={'off'} required/>
                        </FormGroup>
    
                        <FormGroup>
                            <Label>Body:</Label>
                            <Input type='textarea' rows={8} name='body' value={body} onChange={handelChangeBody} required/>
                        </FormGroup>
    
                        <input name='tagString' value={tagString} readOnly hidden />
    
                        <Button color='success' type='submit' className='submit-button'>Add blog</Button>
                    </Form>
                    <br />
    
                    <div className='tag-field-container'>
                        <Label>Tags:</Label>
                        <div className='tags-field'>
                            <span className='display-tags'> {tagsArray} </span>
                            <input placeholder={'Press Enter to add tag'} onKeyUp={e => e.key === 'Enter' ? addTag(e) : null} />
    
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
    else{
        loginWithRedirect()
        return(<h1>Redirecting to Loging.....</h1>)
    }
}

export default Blog



