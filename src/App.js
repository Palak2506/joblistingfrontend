import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);


 const fetchJobs = async (searchLocation = "", pageNumber = 1) => {
  try {
    const res = await axios.get("https://joblistingbackend-6pww.onrender.com/jobs", {
      params: {
        location: searchLocation,
        page: pageNumber,
        limit: 5 
      }
    });

    const jobsArray = res.data.jobs;

    setJobs(jobsArray);
    setSelectedJob(jobsArray[0] || null);

  } catch (error) {
    console.error("Error fetching jobs:", error);
    setJobs([]);
    setSelectedJob(null);
  }
};



 useEffect(() => {
  fetchJobs(location, page);
}, [page]);


  return (
    <div className="app-container">      
      {/* LEFT PANEL: Job Card List */}
      <div className="left-panel">
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by location..."
            style={{ 
              width: "100%", 
              padding: "12px", 
              borderRadius: "8px", 
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "14px"
            }}
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              fetchJobs(e.target.value);
            }}
          />
        </div>
        

        {jobs.map((job) => (
          <div
  onClick={() => setSelectedJob(job)}
  className={`job-card ${
    selectedJob?._id === job._id ? "active" : ""
  }`}
>

            <h4 style={{ margin: "0 0 4px 0", color: "#2d2d2d", fontSize: "16px" }}>{job.title}</h4>
            <p style={{ margin: "0", color: "#6f6f6f", fontSize: "14px" }}>{job.company}</p>
            <p style={{ margin: "4px 0", color: "#6f6f6f", fontSize: "14px" }}>{job.location}</p>
            <div style={{ marginTop: "8px", display: "flex", gap: "10px", alignItems: "center" }}>
               <span style={{ fontSize: "13px", fontWeight: "bold", color: "#d41159" }}>Quick Apply</span>
               <span style={{ fontSize: "12px", color: "#888" }}>{job.postedDateTime ? "Recently" : ""}</span>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL: Detailed View */}
      <div className="right-panel">
        {selectedJob ? (
         <div className="job-detail">

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>{selectedJob.title}</h1>
                <p style={{ margin: "0", fontSize: "16px", color: "#2557a7", fontWeight: "600" }}>{selectedJob.company}</p>
                <p style={{ color: "#6f6f6f" }}>{selectedJob.location}</p>
              </div>
              <a 
                href={selectedJob.job_link} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  backgroundColor: "#2557a7",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                Apply Now.
              </a>
            </div>

            <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }} />

            <h3 style={{ fontSize: "18px" }}>Job Details</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
              <span style={{ backgroundColor: "#f3f3f3", padding: "6px 12px", borderRadius: "4px", fontSize: "13px" }}>💼 {selectedJob.employment_type}</span>
              <span style={{ backgroundColor: "#f3f3f3", padding: "6px 12px", borderRadius: "4px", fontSize: "13px" }}>⏳ {selectedJob.min_exp}-{selectedJob.max_exp} yrs exp</span>
            </div>

            <h3 style={{ fontSize: "18px" }}>Full Job Description</h3>
            <div style={{ lineHeight: "1.6", color: "#444" }}>
              <p>{selectedJob.companytype || "No additional description available."}</p>
            </div>
            
            <p style={{ fontSize: "12px", color: "#999", marginTop: "30px" }}>
              Source: {selectedJob.source} • Posted: {new Date(selectedJob.postedDateTime).toDateString()}
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: "100px", color: "#777" }}>
            <h3>Select a job to see details</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;