import React, { useState } from "react";
import "./Editpurposal.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import ClientProposalForm from "./Createpurposal";
import Draftpurposal from "./Draftpurposal";




const Editpurposal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#b5a14f");
  const [activeTab, setActiveTab] = useState("Summary");
  const navigate = useNavigate();
  const location = useLocation();

  const job = location.state;
  const stage = job?.p?.stage;

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    setIsEditing(false);
  };

  const colorOptions = [
    "#b5a14f",
    "#4285f4",
    "#34a853",
    "#fbbc05",
    "#e91e63",
    "#9c27b0",
  ];

const renderTabContent = () => {
  // Special: Lead stage
  if (stage === "lead" && activeTab === "Client Proposal") {
    return <ClientProposalForm />;
  }

  // Special: Active stage
  if (stage === "Active" && activeTab === "Draft Proposal") {
    return <Draftpurposal />;
  }

  // Common Tabs
  if (activeTab === "Summary") {
    return <div className="tab-content-box"><h5>Summary Content</h5></div>;
  }

  if (activeTab === "Plan & Track") {
    return <div className="tab-content-box"><h5>Plan & Track Content</h5></div>;
  }

  if (activeTab === "Contract & Change Orders") {
    return <div className="tab-content-box"><h5>Contract & Change Orders Content</h5></div>;
  }

  if (activeTab === "Documents") {
    return <div className="tab-content-box"><h5>Documents Content</h5></div>;
  }

  if (activeTab === "Logs") {
    return <div className="tab-content-box"><h5>Logs Content</h5></div>;
  }

  if (activeTab === "Activity") {
    return <div className="tab-content-box"><h5>Activity Content</h5></div>;
  }

  if (activeTab === "Reports") {
    return <div className="tab-content-box"><h5>Reports Content</h5></div>;
  }

  return <div className="tab-content-box"><h5>Select a valid tab</h5></div>;
};


const proposalTabLabel =
  stage === "lead"
    ? "Client Proposal"
    : stage === "Active"
    ? "Draft Proposal"
    : "Contract & Change Orders";


  return (
    <div className="wwd-container container">
      {/* Back Button */}
      <div className="mb-2">
        <Button variant="outline-secondary mt-1" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </Button>
      </div>

      {!isEditing ? (
        <>
          {/* Header */}
          <div className="wwd-header d-flex justify-content-between align-items-center py-3">
            <div>
              <h4 className="mb-0">Wally World Parking Lot</h4>
              <p className="text-muted small">For Griswold Enterprises</p>
            </div>
          </div>

          {/* Tabs */}
   <ul className="nav nav-tabs wwd-tabs mb-4">
  {[
    "Summary",
    "Plan & Track",
    stage === "lead"
      ? "Client Proposal"
      : stage === "Active"
      ? "Draft Proposal"
      : "Contract & Change Orders",
    "Documents",
    "Logs",
    "Activity",
    "Reports",
  ].map((tab, i) => (
    <li className="nav-item" key={i}>
      <button
        className={`nav-link ${activeTab === tab ? "active" : ""}`}
        style={{ background: "none", border: "none" }}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    </li>
  ))}
</ul>



          {/* Tab Content */}
          {renderTabContent()}
        </>
      ) : (
        <EditJob
          onCancel={handleCancel}
          onSave={handleSave}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}
    </div>
  );
};

export default Editpurposal;
