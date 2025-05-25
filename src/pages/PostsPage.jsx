import React, { useState } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import Button from '@mui/material/Button';

const PostsPage = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-gray-800 mt-[50px]">📚 Posts</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleForm}
          style={{ marginTop: '50px', height: '40px' }}
        >
          {showForm ? 'Hide' : 'Create a post'}
        </Button>
      </div>

      {showForm && (
        <div className="mt-6">
          <PostForm />
        </div>
      )}

      <div className="mt-10">
        <PostList />
      </div>
    </div>
  );
};

export default PostsPage;
