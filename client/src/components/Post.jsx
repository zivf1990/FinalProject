import React from 'react';


function Post({ title, body, postId }) {

    return (
        <div className='main-content post'>
            <h2>{title}</h2>
            <h3>{postId}</h3>
            <p>{body}</p>
        </div>

    );
}

export default Post;
