import React from "react";
import axios from "axios";


const Report = () => {
  const downloadReport = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      // Send GET request to generate the referral report CSV with Authorization header
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/generateReferralReport`, {
        headers: {
          "Authorization": `Bearer ${token}`, // Include the token
        },
        responseType: "arraybuffer", // Ensure the response is in binary format (CSV)
      });

      // Log the response to check if it contains data
      console.log("Response data:", response.data);

      // Create a Blob from the response data
      const file = new Blob([response.data], {
        type: "text/csv",
      });

      // Create an anchor tag to download the file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = "referral_report.csv"; // Set the filename
      link.click(); // Trigger the download
    } catch (error) {
      console.error("Error downloading the report:", error);
    }
  };

  return (
    <div>
      <h2>Referral Report</h2>
      <button onClick={downloadReport}>Download Report</button>
    </div>
  );
};

export default Report;
