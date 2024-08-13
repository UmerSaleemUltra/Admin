import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsCollection = collection(db, 'jobs');
      const jobsSnapshot = await getDocs(jobsCollection);
      setJobs(jobsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    const fetchApplications = async () => {
      const applicationsCollection = collection(db, 'applications');
      const applicationsSnapshot = await getDocs(applicationsCollection);
      const appsByJob = {};

      applicationsSnapshot.docs.forEach(doc => {
        const appData = doc.data();
        if (!appsByJob[appData.jobId]) {
          appsByJob[appData.jobId] = [];
        }
        appsByJob[appData.jobId].push({ ...appData, id: doc.id });
      });

      setApplications(appsByJob);
    };

    fetchJobs();
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'jobs', id));
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Job Listings</h1>
      {jobs.map(job => (
        <div key={job.id} className="card mb-4 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{job.title}</h2>
            <p className="card-text">{job.description}</p>
            <h5 className="mt-4">Applications:</h5>
            {applications[job.id] && applications[job.id].length > 0 ? (
              <ul className="list-group">
                {applications[job.id].map(app => (
                  <li key={app.id} className="list-group-item">
                    <p><strong>Applicant Email:</strong> {app.email || 'Email not available'}</p> {/* Check for app.email */}
                    <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applications yet.</p>
            )}
            <div className="d-flex justify-content-end mt-4">
              <Link to={`/edit-job/${job.id}`} className="btn btn-warning me-2">Edit</Link>
              <button onClick={() => handleDelete(job.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
