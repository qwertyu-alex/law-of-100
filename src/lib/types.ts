export interface Completion {
  date: string
  comment?: string
}

export interface Habit {
  id: number
  name: string
  progress: number
  completions: Completion[]
}

