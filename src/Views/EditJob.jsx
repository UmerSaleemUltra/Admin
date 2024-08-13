import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const EditJob = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const jobDoc = doc(db, 'jobs', id);
      const job = await getDoc(jobDoc);
      if (job.exists()) {
        setTitle(job.data().title);
        setDescription(job.data().description);
      } else {
        navigate('/home');
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobDoc = doc(db, 'jobs', id);
    await updateDoc(jobDoc, {
      title,
      description
    });
    navigate('/home');
  };

  return (
    <div className="job-form">
      <h1>Edit Job</h1>
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
        <button type="submit" className="submit-btn">Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;
