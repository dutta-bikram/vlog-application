import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/posts').then(res => setPosts(res.data));
    }, []);

    const addPost = () => {
        if (title.trim() && content.trim()) {
            axios.post('http://localhost:5000/posts', { title, content }).then(res => {
                setPosts([res.data, ...posts]);
                setTitle('');
                setContent('');
            });
        }
    };

    return (
        <div className="container">
            <h1>Simple Vlog App</h1>
            <input className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" /><br />
            <textarea className="textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="Write your vlog..." /><br />
            <button className="button" onClick={addPost}>Post</button>
            <hr />
            {posts.map((post, index) => (
                <div className="post" key={index}>
                    <input type="checkbox" className="checkbox" />
                    <div>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>{new Date(post.createdAt).toLocaleString()}</small>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;
