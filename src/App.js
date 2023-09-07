import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, error, fetchTasks] = useHttp(setTasks)
  const URL = 'https://todotest-eeafc-default-rtdb.europe-west1.firebasedatabase.app/todo.json'

  useEffect(() => {
    fetchTasks(URL);
  }, [fetchTasks]);


  const taskAddHandler = (task) => {

    setTasks((prevTasks) => {
      return prevTasks.concat(task)});
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
