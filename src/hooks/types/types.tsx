export interface HttpRequestConfig {
  url: string
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
  body?: string
  headers?: Record<string, string>
}

export type UseHttpReturnType = [
    isLoading: boolean,
    error: string | null,
    fetchTasks: (url: string) => Promise<void>,
    deleteTask: (url: string) => Promise<void>,
    sendRequest: (
      config: HttpRequestConfig,
      transformData?: (text: Task[]) => Task[]
    ) => Promise<void | Error>,
]

export interface Task {
  id: string
  text: string
}