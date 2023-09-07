import Section from '../UI/Section'
import TaskForm from './TaskForm'
import useHttp from '../../hooks/use-http'

interface NewTaskProps {
  onAddTask: (text: string) => void
}

const NewTask = (props: NewTaskProps) => {

  const [isLoading, error,,,sendRequest] = useHttp(props.onAddTask)

  const addNewTask = (text: string): Promise<void> => {
    const config = {
      url: 'https://todotest-eeafc-default-rtdb.europe-west1.firebasedatabase.app/todo.json',
      method: 'POST',
      body: JSON.stringify({ text: text } ),
      headers: {
        'Content-Type': 'application/json',
      } }
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