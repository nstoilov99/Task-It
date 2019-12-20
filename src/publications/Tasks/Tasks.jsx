import React from 'react';
import taskService from '../../services/task-service';
import Task from '../Tasks/Task/Task'

const Posts = ({user}) => {
  const [tasks, setTasks] = React.useState(null);

  React.useEffect(() => {
    taskService.load(null).then(tasks => {
        setTasks(tasks);
        console.log(user);
        
    });
  }, []);

  return <div>
    {tasks ?
      <div className="Posts">
        {tasks.map((task) =>
          <Task key={task._id} imageAlt="alt" 
            title={task.title}
            levelRequired={task.levelRequired}
            difficulty={task.difficulty}
            expiriance={task.expiriance}
            description={task.description}
            taskId={task._id}
            ></Task>)}
      </div> : <div>Loading...</div>
    }
  </div>;
};


export default Posts;