'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TodoPage() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('tasks')
    if (stored) setTasks(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const add = () => {
    if (!task.trim()) return
    setTasks([...tasks, { id: Date.now(), text: task }])
    setTask('')
  }
  const del = (id) => setTasks(tasks.filter((t) => t.id !== id))

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6 font-sans">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-cyan-400">📝 Todo App</h1>
        <Link href="/portfolio" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl">
          ← Back to Portfolio
        </Link>
      </header>
      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded-xl">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none"
          />
          <button onClick={add} className="mt-3 w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-xl">
            Add Task
          </button>
        </div>
        {tasks.length === 0 && <p className="text-gray-400">No tasks yet.</p>}
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li key={t.id} className="flex justify-between bg-gray-800 p-3 rounded-lg">
              <span>{t.text}</span>
              <button onClick={() => del(t.id)} className="text-red-400">✕</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
