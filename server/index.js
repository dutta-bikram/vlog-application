const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/vlogapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Post = mongoose.model('Post', new mongoose.Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}));

app.get('/posts', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const newPost = new Post({ title: req.body.title, content: req.body.content });
    await newPost.save();
    res.json(newPost);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
