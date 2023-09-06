import classes from './TaskItem.module.css'
import useHttp from '../../hooks/use-http'

const TaskItem = (props) => {
  const URL = `https://todotest-eeafc-default-rtdb.europe-west1.firebasedatabase.app/todo/${props.id}.json`
  const [,,,deleteTask] = useHttp()

  return <li onClick={()=>deleteTask(URL)} className={classes.task}>{props.children}</li>
};

export default TaskItem;