import { Dispatch, SetStateAction, useState } from 'react'

interface useHttpProps {
  cb: Dispatch<SetStateAction<string[]>>
}

const useHttp= ({ cb }: useHttpProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (config, transformData) => {

    setIsLoading(true)
    setError(null )

    let finalConfig = {}
    if(config.method !== undefined) {
      finalConfig = { ...config }
    }

    try {
      const response = await fetch(config.url, finalConfig)

      if(!response.ok) {
        throw new Error('Request failed!')
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
  }

  const fetchTasks = (url) => {
    sendRequest({ url: url }, (data) => {
      const loadedTasks = []
      for(const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text })
      }
      return loadedTasks
    })
  }

  const deleteTask = (url) => {
    sendRequest({ url: url, method: 'DELETE' })
  }

  return [isLoading, error, fetchTasks, deleteTask, sendRequest]

}

export default useHttp
