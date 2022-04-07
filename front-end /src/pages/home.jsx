import React, { useState } from 'react'

const Home = () => {

  const [todoList, setTodoList] = useState([
    { itemString: 'eat', completed: true, id: '1' },
    { itemString: 'shop', completed: false, id: '2' },
    { itemString: 'call', completed: false, id: '3' },
  ])

  const handleTodoListChange = (e) => {
    setTodoList(
      todoList.map((todoItem) => {
        return todoItem.id === e.target.id ? { ...todoItem, completed: !todoItem.completed } : todoItem;
      })
    );
    console.log(todoList)
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
          <div className="flex flex-col pt-8 lg:w-2/5 sm:w-3/5 w-11/12 gap-4">
            {todoList.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  id={item.id}
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
              />
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
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