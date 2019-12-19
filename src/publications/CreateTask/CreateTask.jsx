import React from 'react';
import taskService from '../../services/task-service';
import './CreateTask.css';

const CreatePost = ({ history }) => {
  const descriptionRef = React.useRef();
  const titleRef = React.useRef();
  const levelRef = React.useRef();
  const difficultyRef = React.useRef();
  const expirianceRef = React.useRef();
  const createPost = React.useCallback((e) => {
    e.preventDefault();
    const desc = descriptionRef.current.value;
    const title = titleRef.current.value;
    const level = levelRef.current.value;
    const difficulty = difficultyRef.current.value;
    const expiriance = expirianceRef.current.value;
    taskService.create({title: title, levelRequired: level, difficulty: difficulty, expiriance: expiriance, description: desc}).then(() => {
      history.push('/');
    });
  }, [descriptionRef, history]);

  return <div className="container">
  <form action="/action_page.php">
    <label>Title</label>
    <input type="text" ref={titleRef} placeholder="Your name title.."/>

    <label>Level required</label>
    <input type="number" ref={levelRef} placeholder="Level required.."/>

    <label>Difficulty</label>
    <select name="difficulty" ref={difficultyRef}>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>

    <label>Expiriance</label>
    <input type="number" ref={expirianceRef} placeholder="Expiriance.."/>

    <label>Description</label>
    <textarea ref={descriptionRef} name="subject" placeholder="Write something.."></textarea>

    <input type="submit"onClick={createPost}/>
  </form>
</div>

}

export default CreatePost;