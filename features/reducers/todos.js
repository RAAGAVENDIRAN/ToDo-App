import {
  ADD_TODO,
  SET_TODO,
  MARK_TODO,
  MOVE_TO_TRASH,
  RESTORE_FROM_TRASH,
  DELETE_FROM_TRASH,
  CLEAR_TRASH,
  EDIT_TODO,
  SEARCH_TODO,
  REMOVE_DETAILS,
} from "../actions";

const initialState = {
  completedTodo: [],
  pendingTodo: [],
  trashTodo: [],
  isFetched: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        completedTodo: [
          ...action.payload.completedTodo,
          // ...state.completedTodo,
        ],
        pendingTodo: [...action.payload.pendingTodo],
        trashTodo: [...action.payload.trashTodo],
        isFetched: true,
      };
    case ADD_TODO:
      console.log("Here add");
      return {
        ...state,
        pendingTodo: [action.payload.newTodo, ...state.pendingTodo],
      };

    case MARK_TODO:
      if (action.payload.todo.completed) {
        action.payload.todo.completed = false;
        return {
          ...state,
          completedTodo: state.completedTodo.filter(
            (item) => item.id !== action.payload.todo.id
          ),
          pendingTodo: [action.payload.todo, ...state.pendingTodo],
        };
      } else {
        action.payload.todo.completed = true;
        return {
          ...state,
          pendingTodo: state.pendingTodo.filter(
            (item) => item.id !== action.payload.todo.id
          ),
          completedTodo: [action.payload.todo, ...state.completedTodo],
        };
      }

    case MOVE_TO_TRASH:
      if (action.payload.todo.completed) {
        return {
          ...state,
          completedTodo: state.completedTodo.filter(
            (item) => item.id !== action.payload.todo.id
          ),
          trashTodo: [action.payload.todo, ...state.trashTodo],
        };
      } else {
        return {
          ...state,
          pendingTodo: state.pendingTodo.filter(
            (item) => item.id !== action.payload.todo.id
          ),
          trashTodo: [action.payload.todo, ...state.trashTodo],
        };
      }

    case RESTORE_FROM_TRASH: {
      if (action.payload.todo.completed) {
        return {
          ...state,
          trashTodo: state.trashTodo.filter(
            (item) => item.id !== action.payload.todo.id
          ),
          completedTodo: [action.payload.todo, ...state.completedTodo],
        };
      } else {
        return {
          ...state,
          trashTodo: state.trashTodo.filter(
            (item) => item.id !== action.payload.todo.id
          ),
          pendingTodo: [action.payload.todo, ...state.pendingTodo],
        };
      }
    }

    case DELETE_FROM_TRASH: {
      return {
        ...state,
        trashTodo: state.trashTodo.filter(
          (item) => item.id !== action.payload.todo.id
        ),
      };
    }

    case CLEAR_TRASH: {
      return {
        ...state,
        trashTodo: [],
      };
    }

    case EDIT_TODO: {
      if (action.payload.completed) {
        return {
          ...state,
          completedTodo: state.completedTodo.filter((item) => {
            if (item.id === action.payload.id) {
              item.title = action.payload.title;
              item.date = action.payload.date;
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          pendingTodo: state.pendingTodo.filter((item) => {
            if (item.id === action.payload.id) {
              item.title = action.payload.title;
              item.date = action.payload.date;
            }
            return item;
          }),
        };
      }
    }

    case SEARCH_TODO: {
      if (action.payload.bool === true) {
        return {
          ...state,
          completedTodo: action.payload.array.filter((item) => {
            let itemData = item.title
              ? item.title.toUpperCase()
              : "".toUpperCase();
            let textData = action.payload.newtext.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }),
        };
      } else if (action.payload.bool === false) {
        return {
          ...state,
          pendingTodo: action.payload.array.filter((item) => {
            let itemData = item.title
              ? item.title.toUpperCase()
              : "".toUpperCase();
            let textData = action.payload.newtext.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }),
        };
      } else {
        return {
          ...state,
          trashTodo: action.payload.array.filter((item) => {
            let itemData = item.title
              ? item.title.toUpperCase()
              : "".toUpperCase();
            let textData = action.payload.newtext.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }),
        };
      }
    }

    case REMOVE_DETAILS: {
      return {
        ...state,
        completedTodo: [],
        pendingTodo: [],
        trashTodo: [],
        isFetched: false,
      };
    }

    default:
      return state;
  }
}
