const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')


// database models
const Blog = require('./models/blogModel')
const User = require('./models/userModel')
const TagData = require('./models/TagModel')

// routes
const allBlogsRoute = require('./routes/allBlogs')
const likeRoute = require('./routes/like')
const disLikeRoute = require('./routes/dislike')
const trendingTopicsRoute = require('./routes/trendingTopics')
const trendingBlogsRoute = require('./routes/trendingBlogs')
const popularAuthorsRoute = require('./routes/popularAuthors')
const getBlogRoute = require('./routes/getBlog')
const createNewBlogRoute = require('./routes/createNewBlog')


// connecting to database
mongoose.connect('mongodb+srv://saketvajpai:saketvajpai@cluster0.ahl3y.mongodb.net/ContentWise?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .catch(err => console.log(err))


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, '/client/public')))
// app.use(express.static(path.join(__dirname, 'client/build')))

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.static(path.join(__dirname, 'client', 'public')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


// <<<<<<< akg
// =======
// // TODO: still hardcoded we have to write logic to send trending topics only
// app.get('/trendingTopics', (req, res) => {
//     // var trendingTopics = {
//     //     topics: ['Science', 'IoT', 'Maths', 'Jossa', 'CSS', 'Cloud Computing', 'Hacktober', 'NIT Patna', 'Lucknow : The royal city', 'Novels', 'Robotics', 'ES6']
//     // }
//     // res.json(trendingTopics)
//     TagData.find({}).then(tagData => {
    
//         tagData.sort((a, b) => {
//             var szb = b.blogsId.length
//             var sza = a.blogsId.length
//             return szb-sza
//         }) // sort all blogs
    
    
// <<<<<<< HEAD
//         var topics = []
//         // trendingTopics.push(tagData)
//         for (var i = 0; i < 10; i++){
//             topics.push(tagData[i].tagName) // fetch first 10 trending topics 
//             console.log(tagData[i].tagName)
//         }
//         var trendingTopics = { topics }
//         res.status(200).json(trendingTopics)
//     })
// })

// app.get('/trendingBlogs', (req, res) => {
//     Blog.find({}).then(blog => {

//         blog.sort((a, b) => {
//             return b.likes - a.likes
//         }) // sort all blogs

//         var trendingBlogs = []
//         for (var i = 0; i < 10; i++)
//             trendingBlogs.push(blog[i]) // fetch first 10 trending topics 


//         res.status(200).json(trendingBlogs)
//     })
// })



// // TODO: write logic to fetch data for popular author
// app.get('/popularAuthors', (req, res) => {
//     res.send('json of popularAutors')
// =======
//         var topics = []
//         // trendingTopics.push(tagData)
//         for (var i = 0; i < 10; i++){
//             topics.push(tagData[i].tagName) // fetch first 10 trending topics 
//             console.log(tagData[i].tagName)
//         }
//         var trendingTopics = { topics }
//         res.status(200).json(trendingTopics)
//     })
// })

// app.get('/trendingBlogs', (req, res) => {
//     Blog.find({}).then(blog => {
// >>>>>>> saki


app.use('/fetchAllBlogs', allBlogsRoute)
app.use('/trendingTopics', trendingTopicsRoute)
app.use('/trendingBlogs', trendingBlogsRoute)
app.use('/popularAuthors', popularAuthorsRoute)
app.use('/getBlog', getBlogRoute)
app.use('/createNewBlog', createNewBlogRoute)
app.use('/like', likeRoute)
app.use('/dislike', disLikeRoute)

// <<<<<<< akg
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
// >>>>>>> 7238916ff422571103ff478c814fec95fc98d794


const PORT = 5005
app.listen(PORT, () => {
    console.log('server is ready at port ' + PORT);
})

// =======
//         var trendingBlogs = []
//         for (var i = 0; i < 10; i++)
//             trendingBlogs.push(blog[i]) // fetch first 10 trending topics 


//         res.status(200).json(trendingBlogs)
//     })
// })



// // TODO: write logic to fetch data for popular author
// app.get('/popularAuthors', (req, res) => {
//     res.send('json of popularAutors')
// })


// app.get('/getBlog/:blogid', (req, res) => {
//     Blog.find({ _id: req.params.blogid })
//         .exec()
//         .then(blog => {
//             res.status(200).json(blog[0])
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json(err)
//         })
// })

// /*
//     todo : 
//         1. fetch array of tags in reguest
//         2. see if author already exists in db
//             if yes 
//                 then add id of newly created blog's id to the array of blogs of that author
//             else
//                 create new autor too and add this blog in his list
//         3. for every tag in tag list do same thing as for author
// */


// app.post('/createNewBlog', (req, res) => {
//     console.log('1. done');
//     const blog = new Blog({
//         _id: new mongoose.Types.ObjectId(),
//         title: req.body.title,
//         author: req.body.author,
//         authorId: req.body.authorID,
//         body: req.body.body,
//         tags: JSON.parse(req.body.tagString).tags
//     })
//     console.log(blog);
//     User.find({ _id: blog.authorId })
//         .exec()
//         .then()
//         .then(author => {
//             if (author.length === 1) {
//                 const prevUser = author[0]
//                 prevUser.blogs.push(blog._id)
//                 User.updateOne({ _id: prevUser._id }, { blogs: prevUser.blogs }, () => {
//                     console.log('author updated');
//                 })
//             }
//             else {
//                 const user = new User({
//                     _id: blog.authorId,
//                     name: blog.author,
//                     blogs: [blog._id]
//                 })
//                 user.save()
//                     .then(result => {
//                         console.log('user saved');
//                         console.log(result);
//                     })
//                     .catch(err => console.log(err))
//             }
//         })
//     blog.tags.forEach(element => {
//         var ele = element.toLowerCase();
//         TagData.find({ tagName: ele })
//             .exec()
//             .then()
//             .then(blogsId => {
//                 console.log(ele);
//                 if (blogsId.length === 1) {
//                     const prevTag = blogsId[0]
//                     prevTag.blogsId.push(blog._id)
//                     TagData.updateOne({ tagName: prevTag.tagName.toLowerCase() }, { blogsId: prevTag.blogsId }, { tagLikesCount : prevTag.tagLikesCount }, () => {
//                         console.log('tags updated');
//                     })
//                 }
//                 else {
//                     const tagData = new TagData({
//                         // _id: blog.authorId,
//                         tagName: ele,
//                         blogsId: [blog._id], 
//                         tagLikesCount: 1
//                     })
//                     tagData.save()
//                     .then(result => {
//                         console.log('tags created');
//                         console.log(result);
//                     })
//                     .catch(err => console.log(err))
//                 }
//             })
//     })

//     blog.save().then(result => {
//         console.log('blog saved');
//         res.redirect(`/blog/${blog._id}`)
//     })
//     .catch(err => console.log(err))



//     // TODO: redirect to newly created blog's page
//     // res.redirect('/newBlog') //----------------- will be removed, just for now
//     // for redirection
// })

// app.post('/like', (req, res) => {
//     const request = JSON.parse(Object.keys(req.body)[0])
//     User.find({_id: request.authorId})
//     .exec()
//     .then(resp => {
//         if(resp.length === 1){
//             if(resp[0].likedBlogs.includes(request.blogId)){
//                 console.log('user already likes this blog');
//                 res.json({
//                     likes:-1,
//                     dislikes:-1
//                 })
//             }
//             else if(resp[0].disLikedBlogs.includes(request.blogId)){
//                 console.log('user disliked this blog now requesting to like');
//                 resp[0].disLikedBlogs = resp[0].disLikedBlogs.filter(id => id !== request.blogId)
//                 res[0].likedBlogs.push(request.blogId)
//             }
//             else{
//                 console.log('like this blog');
//             }
//         }
//         else
//         {

//         }
//     })
// })

// app.post('/dislike', (req, res) => {
//     console.log(JSON.parse(Object.keys(req.body)[0]));
//     res.json({
//         likes:10,
//         dislikes:200
//     })
// })


// const PORT = 5000
// app.listen(PORT, () => {
//     console.log('server is ready at port' + PORT);
// })




// // http://localhost:3000/getBlog/5f992d447707e22977c2337d
// // http://localhost:3000/blog/5f992d447707e22977c2337d




// // top author
// >>>>>>> saki
