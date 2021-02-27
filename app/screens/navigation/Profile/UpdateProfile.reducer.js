const formReducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_EDIT':
      return {
        ...state,
        [action.field]: action.payload,
        edited: true
      }
    case 'RESET_EDITED':
      return {
        ...state,
        edited: false
      }
    default:
      return state
  }
}

export default formReducer
