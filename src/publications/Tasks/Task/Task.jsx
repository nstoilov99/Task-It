import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Task.css'
import userService from '../../../services/user-service';
import postService from '../../../services/task-service';

export default function Task({title, difficulty, expiriance, description, taskId, history}) {

    const updateExp = (event) => {   
        event.preventDefault();
        
        userService.update({expiriance});
        postService.delete(taskId);
        history.push("/")
    }

  return (
    <Card className="card">
      <CardContent>
        
        <Typography variant="h5" component="h2">
        {title}
        </Typography>
        <Typography className="title" color="textSecondary" gutterBottom>
          Difficulty:{difficulty}
        </Typography>
        <Typography className="pos" color="textSecondary">
        Expiriance:{expiriance}
        </Typography>
        <Typography variant="body2" component="p">
          
        Description:{description}
        </Typography>
      </CardContent>
      <CardActions>
        <input className="btn-input" type="submit" onClick={updateExp} value="Complete Task"/>
      </CardActions>
    </Card>
  );
}