import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { usePostStore } from "../store/usePostsStore";

const PostForm = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [image, setImageUrl] = React.useState('');

  const createPost = usePostStore((state) => state.createPost);
  const isCreating = usePostStore((state) => state.isCreatingPost);

  const onChange = React.useCallback((value) => {
    setContent(value);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      image,
    };

    await createPost(newPost);

    setTitle('');
    setContent('');
    setImageUrl('');
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите содержимое...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  return (
    <Paper style={{ padding: 30 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="standard"
          placeholder="URL изображения"
          value={image}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
          margin="normal"
        />
        <SimpleMDE value={content} onChange={onChange} options={options} />
        <div style={{ marginTop: 20 }}>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            disabled={isCreating}
          >
            {isCreating ? 'Создание...' : 'Создать пост'}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default PostForm;
