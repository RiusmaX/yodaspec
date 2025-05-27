export interface IProject {
  _id?: string
  title: string
  description: string
  step1?: {
    current_situation: string
    problematic: string
    goal: string
    actors: string
    target_users: string
    scope_included: string
    scope_excluded: string
    final_introduction: string
  }
  createdAt?: Date
  updatedAt?: Date
}
