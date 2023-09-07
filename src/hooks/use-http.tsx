import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { HttpRequestConfig, Task, UseHttpReturnType } from './types';

const useHttp= ( cb: Dispatch<SetStateAction<string[] | string>>): UseHttpReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (config: HttpRequestConfig, transformData?:(text: Task[])=>Task[]): Promise<Error> => {

    setIsLoading(true)
    setError(null )

    let finalConfig = {}
    if(config.method !== undefined) {
      finalConfig = { ...config }
    }

    try {
      const response = await fetch(config.url, finalConfig)

      if(!response.ok) {
        return new Error('Request failed!')
      }

      const data = await response.json()
      const transformedData = transformData ? transformData(data) : JSON.parse(config.body)

      if(cb) {
        if (typeof transformedData === 'string') {
          const newTask = [transformedData]
          cb(newTask)
        } else {
          cb(transformedData)
        }
      }
    } catch (error) {
      setError(error.message || 'Something went wrong!')
    }
    setIsLoading(false)
  },[cb])

  const fetchTasks = useCallback(async (url: string) => {
    try {
      await sendRequest({ url: url }, (data) => {
        const loadedTasks = []
        for(const taskKey in data) {
          loadedTasks.push({ id: taskKey, text: data[taskKey].text })
        }
        return loadedTasks
      })
    } catch (error) {
      throw new Error(`Fetch request ${error}`)
    }

  }, [sendRequest])

  const deleteTask = useCallback(async (url: string): Promise<void> => {
    try {
      await sendRequest({ url: url, method: 'DELETE' })
    } catch(error) {
      throw new Error(`New error during delete ${error}`)
    }
  },[sendRequest])

  return [isLoading, error, fetchTasks, deleteTask, sendRequest]

}

export default useHttp
