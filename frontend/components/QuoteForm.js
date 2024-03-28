import React, {useReducer} from 'react' // 👈 you'll need the reducer hook

// 👇 these are the types of actions that can change state
const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

// 👇 create your initial state object here
const initialState = {authorInput: "", quoteInput: ""}
// 👇 create your reducer function here
function reducer(state, action) {
  switch(action.type) {
    case "changeInput": return {...state, [action.input]: action.payload}
    case "resetForm": return {...initialState}
    default: return state
  }
}

export default function TodoForm({ createQuote = () => { }, getNextId }) {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState)
  const onChange = (event, inputField) => {
    // 👇 implement
      dispatch({type: "changeInput", input: inputField, payload: event.target.value})
  }
  const resetForm = () => {
    // 👇 implement
    dispatch({type: "resetForm"});
  }
  const onNewQuote = (event) => {
    // 👇 implement
    event.preventDefault();
    const newQuote = {
      id: getNextId(),
      quoteText: state.quoteInput,
      authorName: state.authorInput,
      apocryphal: false
    }
    createQuote(newQuote);
    resetForm()
  }
  
  // 👇 some props are missing in the JSX below:
  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label><span>Author:</span>
        <input
          type='text'
          name='authorName'
          placeholder='type author name'
          onChange={event => onChange(event, "authorInput")}
          value={state.authorInput}
        />
      </label>
      <label><span>Quote text:</span>
        <textarea
          type='text'
          name='quoteText'
          placeholder='type quote'
          onChange={event => onChange(event, "quoteInput")}
          value={state.quoteInput}
        />
      </label>
      <label><span>Create quote:</span>
        <button
          role='submit'
        >DO IT!</button>
      </label>
    </form>
  )
}
