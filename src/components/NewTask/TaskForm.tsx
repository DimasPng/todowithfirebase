import { FormEvent, useRef } from 'react';

import classes from './TaskForm.module.css';

interface TaskFormProps {
  onEnterTask: (text: string)=> Promise<void>
  loading: boolean
}

const TaskForm = (props: TaskFormProps) => {
  const taskInputRef = useRef<HTMLInputElement | null>(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type='text' ref={taskInputRef} />
      <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
