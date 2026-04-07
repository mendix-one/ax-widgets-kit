import { createWidgetContext } from '@ax/shared'

import { type TasksMenuStore } from './store'

export const { Provider: TasksMenuProvider, useStore: useTasksMenuStore } =
  createWidgetContext<TasksMenuStore>('TasksMenu')
