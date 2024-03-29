import React, { useEffect, useState } from 'react';
import Add from './components/Add';
import Update from './components/update'; // Ensure correct import path

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (todoId, updatedData) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, ...updatedData } : todo
    );
    setTodos(updatedTodos);
    setSelectedTodo(null); // Reset selectedTodo after update

    alert("Updated Todo Data:", updatedData);
  };

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  const handleDelete = (todoId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (confirmDelete) {
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
      alert("Deleted");
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="text-center">
            <Add addTodo={addTodo} />
          </div>
          <h1 className="text-center">Todos List</h1>
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>User ID</th>
                <th>Title</th>
                <th>Completed</th>
                <th>Actions</th> {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.userId}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed ? "Completed" : "Not Completed"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary m-2"
                      onClick={() => setSelectedTodo(todo)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger m-2"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedTodo && (
            <div className="mt-4" id="update">
              <h2 className="text-center">Update Todo</h2>
              {/* Pass selectedTodo and handleUpdate to Update component */}
              <Update todo={selectedTodo} onUpdate={handleUpdate} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Todos;

