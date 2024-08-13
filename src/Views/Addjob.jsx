import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'jobs'), {
      title,
      description
    });
    navigate('/home');
  };

  return (
    <div className="job-form">
      <h1>Add Job</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Job Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Job Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button type="submit" className="submit-btn">Add Job</button>
        <br />

      </form>
    </div>
  );
};

export default AddJob;
