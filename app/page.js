'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // App Router hook

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!text) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleComplete = async (id, completed) => {
    const res = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, completed: !completed }),
    });
    const updated = await res.json();
    setTodos(todos.map(t => t._id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded p-6">
        <h1 className="text-2xl font-bold mb-4">📝 Fullstack Todo App</h1>

        {/* Go to /note button */}
        <button
          onClick={() => router.push('/note')}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Go to /note
        </button>

        <div className="flex mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add task"
            className="flex-1 px-3 py-2 border rounded-l"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-4 py-2 rounded-r"
          >
            Add
          </button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="flex items-center justify-between py-2">
              <span
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
                onClick={() => toggleComplete(todo._id, todo.completed)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
