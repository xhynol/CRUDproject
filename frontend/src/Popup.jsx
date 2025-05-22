import React from 'react';
import Popup from 'reactjs-popup';
import './popup.css';
import { useState } from 'react';

export default function NewPopup({onSubmit }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [toDo, setTodo] = useState("");
    const [priority, setPriority] = useState(0);
    const [progress, setProgress] = useState("Not Started");

    const HandleSubmit = () => {
        if (name === "" || email === "" || toDo === "" || progress === "") {
            document.getElementById("Warning").innerHTML = "Please fill all the fields";
            return;
        }
        onSubmit({
            name: name,
            email: email,
            todo: toDo,
            priority: priority,
            progress: progress
        });
        setName("");
        setEmail("");
        setTodo("");
        setPriority(0);
        setProgress("Not Started");
        document.getElementById("Warning").innerHTML = "";
    }


    return (
        <div>
            <Popup trigger=
                {<button> Create </button>}
                modal nested>
                {
                    close => (

                        <div className='modal'>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className='content'>
                                <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Todo</th>
                                            <th>Priority</th>
                                            <th>Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            /></td>
                                            <td><input type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} /></td>
                                            <td><input type="text"
                                                value={toDo}
                                                onChange={(e) => setTodo(e.target.value)} /></td>
                                            <td><input type="text"
                                                value={priority}
                                                onChange={(e) => setPriority(e.target.value)} /></td>
                                            <td><select value={progress}
                                                onChange={e => setProgress(e.target.value)} >
                                                <option value="Completed">Complete</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Not Started">Not Started</option>
                                            </select></td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="actions">
                                <button onClick=
                                    {() => HandleSubmit()}>
                                    Submit
                                </button>
                            </div>
                            <div id="Warning"></div>
                        </div>
                    )
                }
            </Popup>
        </div>
    )
};