import {useState} from 'react';

// const useHttp = (fetchRequest, cb) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//
//   const fetchTasks = async (taskText) => {
//     setIsLoading(true);
//     setError(null);
//
//     let config = {
//       method: fetchRequest.method,
//     }
//
//     if(taskText) {
//       config.body = JSON.stringify({ text: taskText })
//       config.headers = fetchRequest.headers
//     }
//
//     try {
//       const response = await fetch(
//          fetchRequest.url, config
//       );
//       if (!response.ok) {
//         throw new Error('Request failed!');
//       }
//       const data = await response.json();
//       const loadedTasks = [];
//       for (const taskKey in data) {
//         console.log(taskKey)
//         loadedTasks.push({ id: taskKey, text: data[taskKey].text });
//       }
//       if(cb) {
//         cb(loadedTasks);
//       }
//     } catch (err) {
//       setError(err.message || 'Something went wrong!');
//     }
//     setIsLoading(false);
//   };
//
//   return [isLoading, error, fetchTasks]
// }
//
// export default useHttp

const useHttp= (cb) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (config, transformData) => {

    setIsLoading(true)
    setError(null)

    let finalConfig = {}
    if(config.method !== undefined) {
      finalConfig = {...config}
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
    sendRequest({url: url}, (data) => {
      const loadedTasks = []
      for(const taskKey in data) {
        loadedTasks.push({id: taskKey, text: data[taskKey].text})
      }
      return loadedTasks
    })
  }

  const deleteTask = (url) => {
    sendRequest({url: url, method: "DELETE"})
  }

  return [isLoading, error, fetchTasks, deleteTask, sendRequest]

}

export default useHttp
