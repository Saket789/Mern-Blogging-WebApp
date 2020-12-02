import React from 'react'

import './index.css';
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './home.js'
import NewBlog from './newBlog.js'
import Blog from './components/blogPage.js'
import AllBlogs from './allBlogs.js'

/**
 * redirects according to requested path in url
 */
function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/allBlogs" component={AllBlogs}></Route>
            <Route exact path="/newBlog" component={NewBlog}></Route>
            <Route path="/blog/:blogId" component={Blog}></Route>
        </BrowserRouter>
    )
}

export default App