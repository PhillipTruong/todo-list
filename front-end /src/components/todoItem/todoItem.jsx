import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = ({ id, completed, handleTodoListChange, itemString }) => {
  console.log(completed)
  return (
    <div className="flex gap-2 items-center">
      <input
        id={id}
        type="checkbox"
        checked={completed}
        onChange={handleTodoListChange}
      />
      <p>{itemString}</p>
    </div>
  )
}

TodoItem.propTypes = {
  id: PropTypes.string,
  completed: PropTypes.bool,
  handleTodoListChange: PropTypes.func,
  itemString: PropTypes.string,
}

export default TodoItem