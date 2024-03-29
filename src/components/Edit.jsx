import React, { useState, useEffect } from "react";

function UpdateForm({ handleUpdate }) {
    const [inputData, setInputData] = useState({
        id: '',
        userId: '',
        title: '',
        completed: ''
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(user.id, inputData);
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => res.json())
        .then(data => setInputData({
            id: data.id,
            userId: data.userId,
            title: data.title,
            completed: data.completed
        }))
        .then(() => handleUpdate(inputData.id,inputData));
      }, [id, handleUpdate]);
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input type="text" className="form-control" id="firstName" name="firstName" value={inputData.userId} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input type="text" className="form-control" id="lastName" name="lastName" value={inputData.id} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" name="email" value={inputData.title} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input type="text" className="form-control" id="phone" name="phone" value={inputData.completed} onChange={handleChange} />
      </div>   
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}



export default UpdateForm;
