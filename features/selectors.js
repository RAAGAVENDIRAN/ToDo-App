import store from "./store";

export const getCompletedTodos = () => {
  return store.getState().todo.completedTodo;
};

export const getPendingTodos = () => {
  return store.getState().todo.pendingTodo;
};
