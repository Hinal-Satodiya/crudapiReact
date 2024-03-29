import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Update() {
    const { id } = useParams();
    const [data, setData] = useState({
        id: '',
        userId: '',
        title: '',
        completed: ''
    });

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => res.json())
            .then(todoData => {
                setData(todoData);
            })
            .catch(error => {
                console.error('Error fetching todo data:', error);
            });
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(updatedData => {
            console.log('Updated data:', updatedData);
            // Optionally handle success feedback or route to another page
        })
        .catch(error => {
            console.error('Error updating todo data:', error);
            // Optionally handle error states
        });
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-item-center">
            <div className="w-50 vh-100 border bg-light p-3 m-5">
                <p className="text-center ">Update Todo Details</p>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="id">ID</label>
                        <input
                            type="text"
                            name="id"
                            className="form-control"
                            value={data.id}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="userId">User ID</label>
                        <input
                            type="text"
                            name="userId"
                            className="form-control"
                            value={data.userId}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={data.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="completed">Completed</label>
                        <input
                            type="text"
                            name="completed"
                            className="form-control"
                            value={data.completed}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-info mt-3">Submit</button>
                </form>
                <br />
                <br />
            </div>
        </div>
    )
}

export default Update;
