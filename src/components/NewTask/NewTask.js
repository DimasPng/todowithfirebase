import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {

  const [isLoading, error,,,sendRequest] = useHttp(props.onAddTask)

  const addNewTask = (text) => {
    const config = {
      url: 'https://todotest-eeafc-default-rtdb.europe-west1.firebasedatabase.app/todo.json',
      method: 'POST',
      body: JSON.stringify({text: text}),
      headers: {
        'Content-Type': 'application/json',
      }}
    return sendRequest(config)
  }

  return (
    <Section>
      <TaskForm onEnterTask={addNewTask} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
