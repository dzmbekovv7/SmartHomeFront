import React, { useEffect, useState } from 'react';
import { usePostStore } from "../store/usePostsStore";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import ru from 'date-fns/locale/ru';

const PostList = () => {
  const { posts, fetchPosts, isLoadingPosts, deletePost, updatePost } = usePostStore();
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImage, setEditImage] = useState('');

  useEffect(() => {
    if (posts.length === 0) fetchPosts();
  }, [posts.length, fetchPosts]);

  const handleEditClick = (post) => {
    setEditPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditImage(post.image || '');
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await updatePost(editPostId, {
      title: editTitle,
      content: editContent,
      image: editImage,
    });
    setEditPostId(null);
    setEditTitle('');
    setEditContent('');
    setEditImage('');
  };

  if (isLoadingPosts) return <p className="text-center text-gray-500">Загрузка постов...</p>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 relative"
        >
          {editPostId === post._id ? (
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <TextField
                label="Заголовок"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                fullWidth
              />
              <TextField
                label="URL изображения"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                fullWidth
              />
              <SimpleMDE value={editContent} onChange={setEditContent} />
              <div className="flex gap-3 mt-4">
                <Button variant="contained" color="primary" type="submit">
                  Сохранить
                </Button>
                <Button variant="outlined" onClick={() => setEditPostId(null)}>
                  Отмена
                </Button>
              </div>
            </form>
          ) : (
            <>
              {/* Автор и дата */}
              <div className="flex items-center mb-4">
                {post.authorId?.profilePic && (
                  <img
                    src={post.authorId.profilePic}
                    alt="Аватар"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-800">{post.authorId?.fullName || 'Asli'}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ru })}
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h3>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-auto rounded-md object-cover mb-4"
                />
              )}
              <p className="text-gray-700 mb-4">{post.content}</p>

              {/* Кнопки */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditClick(post)}
                  size="small"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deletePost(post._id)}
                  size="small"
                >
                  <FaTrashAlt />
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
