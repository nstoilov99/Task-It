import React from 'react';
import taskService from '../../services/task-service';
import './CreateTask.css';
import Tasks from '../Tasks/Tasks';

const CreatePost = ({ history, state}) => {
  const descriptionRef = React.useRef();
  const titleRef = React.useRef();
  const difficultyRef = React.useRef();
  const expirianceRef = React.useRef();
  const createPost = React.useCallback((e) => {   
    console.log(state);
     
    e.preventDefault();
    const desc = descriptionRef.current.value;
    const title = titleRef.current.value;
    const difficulty = difficultyRef.current.value;
    const expiriance = expirianceRef.current.value;
    taskService.create({title: title, difficulty: difficulty, expiriance: expiriance, description: desc}).then(() => {
      history.push('/');
    });
  }, []);

  return <div className="container">
  <form action="/action_page.php">
    <label>Title</label>
    <input type="text" ref={titleRef} placeholder="Your name title.."/>

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
  <Tasks ></Tasks>
</div>

}

export default CreatePost;