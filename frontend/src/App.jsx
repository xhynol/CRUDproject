import { useState, useEffect } from 'react'
import PopUp from './Popup';
import './App.css'


function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProgress, setSelectedProgress] = useState(data?.progress); 
  const [largestId, setLargestId] = useState(0);
  const url = "https://backend-dot-cogent-node-459907-q6.uc.r.appspot.com/todolists/"

  const handleNameChange = (id, newName) => {
    const updatedTodos = data.map(todo =>
      todo.id === id ? { ...todo, name: newName } : todo
    );
    setData(updatedTodos);

    fetch(`${url}updateName?id=${id}&newName=${encodeURIComponent(newName)}`, {
      method: 'PATCH', // or 'PUT' depending on your API
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async res => {
        const text = await res.text();

        if (!res.ok) throw new Error('Failed to update name');
        return text; // or parse JSON if JSON
      })
      .then(data => {
        console.log('Name updated successfully', data);
        // Optionally sync state with response if needed
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update name on server');

        // Optionally revert local change if update fails
        setData(todos);
      });

  };

  const handleEmailChange = (id, newEmail) => {
    const updatedTodos = data.map(todo =>
      todo.id === id ? { ...todo, email: newEmail } : todo
    );
    setData(updatedTodos);

    fetch(`${url}updateEmail?id=${id}&newEmail=${encodeURIComponent(newEmail)}`, {
      method: 'PATCH', // or 'PUT' depending on your API
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async res => {
        const text = await res.text();

        if (!res.ok) throw new Error('Failed to update email');
        return text; // or parse JSON if JSON
      })
      .then(data => {
        console.log('Email updated successfully', data);
        // Optionally sync state with response if needed
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update email on server');

        // Optionally revert local change if update fails
        setData(todos);
      });

  };

    const handleToDoChange = (id, newTodo) => {
    const updatedTodos = data.map(todo =>
      todo.id === id ? { ...todo, todo: newTodo } : todo
    );
    setData(updatedTodos);

    fetch(`${url}updateTodo?id=${id}&newToDo=${encodeURIComponent(newTodo)}`, {
      method: 'PATCH', // or 'PUT' depending on your API
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async res => {
        const text = await res.text();

        if (!res.ok) throw new Error('Failed to update todo');
        return text; // or parse JSON if JSON
      })
      .then(data => {
        console.log('Todo updated successfully', data);
        // Optionally sync state with response if needed
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update todo on server');

        // Optionally revert local change if update fails
        setData(todos);
      });

    };
  
    const handleProgressChange = (id, newProgress) => {
    const updatedTodos = data.map(todo =>
      todo.id === id ? { ...todo, progress: newProgress } : todo
    );
    setData(updatedTodos);

    fetch(`${url}updateProgress?id=${id}&newProgress=${encodeURIComponent(newProgress)}`, {
      method: 'PATCH', // or 'PUT' depending on your API
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async res => {
        const text = await res.text();

        if (!res.ok) throw new Error('Failed to update progress');
        return text; // or parse JSON if JSON
      })
      .then(data => {
        console.log('Progress updated successfully', data);
        // Optionally sync state with response if needed
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update Progress on server');

        // Optionally revert local change if update fails
        setData(todos);
      });

    };
  const handleDelete = (id) => { 
    console.log(id);
    const updatedTodos = data.filter(todo => todo.id !== id);
    setData(updatedTodos);

    fetch(`${url}delete?id=${id}`, {
      method: 'DELETE', // or 'PUT' depending on your API
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async res => {
        const text = await res.text();

        if (!res.ok) throw new Error('Failed to delete todo');
        return text; // or parse JSON if JSON
      })
      .then(data => {
        console.log('Todo deleted successfully', data);
        // Optionally sync state with response if needed
      })
      .catch(err => {
        console.error(err);
        alert('Failed to delete todo on server');

        // Optionally revert local change if update fails
        setData(todos);
      });

  }
  const handleCreateData = async({ name, email, todo, priority, progress }) => {
      console.log(name, email, todo, priority, progress);
    const newTodo = {
      id: largestId + 1,
      name,
      email,
      todo,
      priority,
      progress
    };
    setLargestId(largestId + 1);
    const updatedTodos = [...data, newTodo];
    setData(updatedTodos);
      fetch(`${url}create?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&todo=${encodeURIComponent(todo)}&priority=${priority}&progress=${encodeURIComponent(progress)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async res => {
        const text = await res.text();

        if (!res.ok) throw new Error('Failed to create todo');
        return text; // or parse JSON if JSON
      })
      .then(data => {
        console.log('Todo created successfully', data);
        // Optionally sync state with response if needed
      })
      .catch(err => {
        console.error(err);
        alert('Failed to create todo on server');

        // Optionally revert local change if update fails
        setData(todos);
      });
    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}getAll`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        setData(result)
        setLargestId(result.reduce((max, todo) => Math.max(max, todo.id), 0)); // Find the largest ID
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }

      
    }

    fetchData()
    
  }
    , [])
  


  return (
    <>
      <div>
        <h1>Todo List</h1>
        <PopUp onSubmit={submitedData => handleCreateData(submitedData)}/>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Todo</th>
                <th>Priority</th>
                <th>Progress</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td><input
                    type="text"
                    value={todo.name}
                    onChange={e => handleNameChange(todo.id, e.target.value)}
                  /></td>
                  <td><input
                    type="text"
                    value={todo.email || "n/a"}
                    onChange={e => handleEmailChange(todo.id, e.target.value)}
                  /></td>
                  <td><input
                    type="text"
                    value={todo.todo}
                    onChange={e => handleToDoChange(todo.id, e.target.value)}
                  /></td>
                  <td>{todo.priority}</td>
                  <td> <select
                    value={todo.progress} 
                    onChange={e => handleProgressChange(todo.id, e.target.value)} 
                  >
                    <option value="Completed">Complete</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Not Started">Not Started</option>
                  </select></td>
                  <td><button onClick = {() => handleDelete(todo.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      

    </>
  )
}

export default App
