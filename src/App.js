import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [location, setLocation] = useState("");

  const fetchJobs = async (searchLocation = "") => {
    const res = await axios.get(
  `https://joblistingbackend-6pww.onrender.com/jobs?location=${searchLocation}`
);

    setJobs(res.data);
    setSelectedJob(res.data[0] || null);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* LEFT PANEL */}
      <div style={{ width: "35%", borderRight: "1px solid #ccc", padding: 12 }}>
        <h3>Job Listings</h3>

        <input
          type="text"
          placeholder="Search by location"
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            fetchJobs(e.target.value);
          }}
        />

        {jobs.map(job => (
          <div
            key={job._id}
            onClick={() => setSelectedJob(job)}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              marginBottom: 8,
              cursor: "pointer",
              background:
                selectedJob?._id === job._id ? "#f3f3f3" : "white"
            }}
          >
            <b>{job.title}</b>
            <p style={{ margin: 0 }}>{job.location}</p>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div style={{ width: "65%", padding: 20 }}>
        {selectedJob ? (
          <>
            <h2>{selectedJob.title}</h2>

            <p><b>Company:</b> {selectedJob.company}</p>
            <p><b>Location:</b> {selectedJob.location}</p>

            <p><b>Description:</b></p>
            <p>
              {selectedJob.companytype || "Job description not provided."}
            </p>

            <p><b>Employment Type:</b> {selectedJob.employment_type}</p>

            <p>
              <b>Experience Range:</b>{" "}
              {selectedJob.min_exp} - {selectedJob.max_exp} years
            </p>

            <p>
              <b>Posted Date:</b>{" "}
              {selectedJob.postedDateTime
                ? new Date(selectedJob.postedDateTime).toDateString()
                : "N/A"}
            </p>

            <p><b>Source:</b> {selectedJob.source}</p>

            {selectedJob.job_link && (
              <p>
                <a href={selectedJob.job_link} target="_blank" rel="noreferrer">
                  Apply Here
                </a>
              </p>
            )}
          </>
        ) : (
          <p>Select a job to view details</p>
        )}
      </div>
    </div>
  );
}

export default App;
