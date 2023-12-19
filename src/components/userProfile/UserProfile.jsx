import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Clock from '../Clock';
import axios from 'axios';
import PostPopup from '../PostPopup';
import './userProfile.css'

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        // Fetch user details from API
        axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => setUser(response.data))
            .catch(error => console.error(error));

        // Fetch user posts from API
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));

        // Fetch countries from API
        axios.get('http://worldtimeapi.org/api/timezone')
            .then(response => setCountries(response.data))
            .catch(error => console.error(error));

    }, [userId]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };


    // Function to open post popup
    const openPostPopup = (post) => {
        setSelectedPost(post);
        setShowPopup(true);
    };

    // Function to close post popup
    const closePostPopup = () => {
        setShowPopup(false);
        setSelectedPost(null);
    };

    // Function to close post popup when clicking outside
    const handleClickOutside = (e) => {
        if (e.target.className === 'post-popup') {
            closePostPopup();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showPopup]);

    return (
        <div className='profile-wapper'>
            <div className='clock-wrapper'>
                <Link className='button' to="/">Back</Link>
                <div style={{ display: 'flex', gap:'10px',alignItems:'center' }}>
                    <select style={{height:'40px'}} value={selectedCountry} onChange={handleCountryChange}>
                        <option value="" disabled>Select a Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    <Clock selectedCountry={selectedCountry} />
                </div>
            </div>
            {user && (
                <div>
                    <h1>Profile Page</h1>
                    <div className='card user-details-card' style={{display:'flex'}}>
                        <div>
                            <h3>Name: {user.name}</h3>        
                            <p><b>Username:</b> {user.username} | <b>Catch Phrase:</b> {user.company.catchPhrase}</p>
                        </div>
                        <div>
                       
                            <h3>Address : {user.address.street}, {user.address.suite}, {user.address.city}</h3>
                            <p><b>Email:</b> {user.email} | <b>Phone:</b> {user.phone}</p>
                        </div>
                    </div>
                    <div>
                        <h2 style={{textAlign:'center'}}>Posts</h2>
                        <div className='post-container'>
                            {posts.map(post => (
                                <div className='card post-card' key={post.id} onClick={() => openPostPopup(post)}>
                                    <h4>{post.title}</h4>
                                    <p>{post.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {showPopup && (
                        <PostPopup post={selectedPost} onClose={closePostPopup} />
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
