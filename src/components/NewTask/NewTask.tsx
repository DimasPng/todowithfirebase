import Section from '../UI/Section'
import TaskForm from './TaskForm'
import useHttp from '../../hooks/use-http'
import { HttpRequestConfig } from '../../hooks/types';

interface NewTaskProps {
  onAddTask: (text: string) => void
}

const NewTask = (props: NewTaskProps) => {

  const [isLoading, error,,,sendRequest] = useHttp(props.onAddTask)

  const addNewTask = async (text: string): Promise<void> => {
    try {
      const config: HttpRequestConfig = {
        url: 'https://todotest-eeafc-default-rtdb.europe-west1.firebasedatabase.app/todo.json',
        method: 'POST',
        body: JSON.stringify({ text: text }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await sendRequest(config);
    } catch (e) {
      throw new Error(`Ошибка при добавлении задачи ${e.message}`);
    }
  };

  return (
    <Section>
      <TaskForm onEnterTask={addNewTask} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;