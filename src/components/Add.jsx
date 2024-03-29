import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Add({ addTodo }) {
    const [inputData, setInputData] = useState({
        id: '',
        userId: '',
        title: '',
        completed: ''
    });
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                addTodo(data);
                setInputData({
                    id: '',
                    userId: '',
                    title: '',
                    completed: ''
                });
                alert("Data Added Successfully");
                navigate('/');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (

        <div className="d-flex w-100 justify-content-center align-item-center ">
            <div className="border bg-light p-3 m-5">
                <Button onClick={handleShow}>Add user</Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton className="text-center"> Fill User Details</Modal.Header>
                    <form className="p-3" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="id">ID</label>
                            <input
                                type="text"
                                name="id"
                                className="form-control"
                                value={inputData.id}
                                onChange={e => setInputData({ ...inputData, id: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="userId">User ID</label>
                            <input
                                type="text"
                                name="userId"
                                className="form-control"
                                value={inputData.userId}
                                onChange={e => setInputData({ ...inputData, userId: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={inputData.title}
                                onChange={e => setInputData({ ...inputData, title: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="completed">Completed</label>
                            <input
                                type="text"
                                name="completed"
                                className="form-control"
                                value={inputData.completed}
                                onChange={e => setInputData({ ...inputData, completed: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-info mt-3">
                            Submit
                        </button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default Add;
