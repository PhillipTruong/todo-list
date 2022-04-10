import React, { useState, useEffect } from 'react'
import axios from "axios"

const Home = () => {
  const beURL = 'http://localhost:3001'
  const fixedTodoListId = '62520dee3fb782c07c5c61c0'

  const [todoList, setTodoList] = useState([])
  const [currentTodo, setCurrentTodo] = useState('')

  useEffect(async () => {
    try {
      const todoItemList = await axios(beURL + '/todos/getAllTodoItems/' + fixedTodoListId)
      console.log('lists:', todoItemList)
      setTodoList(todoItemList.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleTodoListChange = async (e) => {
    const { checked: changingTodoValue, id: changingTodoId } = e.target
    const changingTodo = {
      completed: changingTodoValue,
    }
    await axios.patch(beURL + '/todos/editTodoItem/' + changingTodoId, changingTodo)
      .then((response) => {
        let newTodo = response.data
        console.log(newTodo.completed)

        setTodoList(
          todoList.map((todoItem) => {
            return todoItem._id === changingTodoId ? { ...todoItem, completed: changingTodoValue } : todoItem;
          })
        )
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleAddTodo = async () => {
    const newTodo = { itemString: currentTodo }

    await axios.post(beURL + '/todos/createTodoItem/' + fixedTodoListId, newTodo)
      .then((response) => {
        let newTodo = response.data
        setTodoList([...todoList, newTodo])
        setCurrentTodo('')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCurrentTodoText = (e) => {
    setCurrentTodo(e.target.value)
  }

  return (
    <div className='min-h-screen bg-blue-200 p-10 grid gap-5 grid-rows-5 grid-cols-1 sm:grid-cols-3 sm:grid-rows-1'>
      <div className='p-5 bg-white rounded-lg'>
        <h2>My Lists:</h2>
        <ul className='list-disc list-inside'>
          <li>Groceries</li>
          <li>School</li>
        </ul>
      </div>

      <div className='p-5 bg-white rounded-lg row-span-4 sm:col-span-2 sm:row-span-1'>
        <h2>
          List Name
        </h2>

        <div className="flex justify-center items-center">
          <div className="flex flex-col pt-4 w-full gap-4">
            {todoList.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  id={item._id}
                  type="checkbox"
                  checked={item.completed}
                  onChange={handleTodoListChange}
                />
                <p>{item.itemString}</p>
              </div>
            ))}

            <div className="flex gap-2">
              <input
                placeholder="New Todo"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleCurrentTodoText}
              />
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddTodo}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home