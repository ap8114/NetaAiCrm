// import React, { useState } from 'react';
// import { FaArrowLeft, FaSearch, FaEdit, FaUser } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const VendorsPage = () => {
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showUserModal, setShowUserModal] = useState(false);
//   const navigate = useNavigate();
//   const [vendorType, setVendorType] = useState(""); // Add this state
//   const [roleTrade, setRoleTrade] = useState("");   // For Role/Trade field
//   return (
//     <div className="container-fluid p-4">
//       {/* Back Button above heading */}
//       <div className="mb-2">
//         <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
//           <FaArrowLeft className="me-1" /> Back
//         </button>
//       </div>

//       {/* Add Vendor Modal */}
// <div className={`modal fade ${showAddModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: showAddModal ? 'rgba(0,0,0,0.3)' : 'none' }}>
//   <div className="modal-dialog modal-lg modal-dialog-centered">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title">Add New Vendor</h5>
//         <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
//       </div>
//       <div className="modal-body">
//         <div className="row g-3">
//           {/* ...other fields... */}
//           <div className="col-md-6">
//             <label className="form-label">Vendor Name</label>
//             <input className="form-control" value="ABC Supply" readOnly />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Contact Name</label>
//             <input className="form-control" value="Albert Brenamen" readOnly />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Address Lookup</label>
//             <input className="form-control" value="237 West Thames Street" readOnly />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Phone</label>
//             <input className="form-control" value="2122333230" readOnly />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Email</label>
//             <input className="form-control" value="albert@abcsupply.com" readOnly />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Other</label>
//             <input className="form-control" value="-" readOnly />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Vendor Type</label>
//             <select
//               className="form-select"
//               value={vendorType}
//               onChange={e => setVendorType(e.target.value)}
//             >
//               <option value="">Select a vendor type</option>
//               <option>Materials supplier</option>
//               <option>Subcontractor</option>
//               <option>Equipment supplier</option>
//               <option>Miscellaneous expenses</option>
//             </select>
//           </div>
//           {vendorType === "Subcontractor" && (
//             <div className="col-md-6">
//               <label className="form-label">Role/Trade</label>
//               <input
//                 className="form-control"
//                 value={roleTrade}
//                 onChange={e => setRoleTrade(e.target.value)}
//                 placeholder="Enter role or trade"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="modal-footer">
//         <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
//         <button className="btn btn-primary">Submit</button>
//       </div>
//     </div>
//   </div>
// </div>

//       {/* Edit Vendor Modal */}
//       <div className={`modal fade ${showEditModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: showEditModal ? 'rgba(0,0,0,0.3)' : 'none' }}>
//         <div className="modal-dialog modal-lg modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Edit Vendor</h5>
//               <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
//             </div>
//             <div className="modal-body">
//               <div className="row g-3">
//                 {/* ...other fields... */}
//                 <div className="col-md-6">
//                   <label className="form-label">Vendor Name</label>
//                   <input className="form-control" value="ABC Supply" readOnly />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Contact Name</label>
//                   <input className="form-control" value="Albert Brenamen" readOnly />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Address Lookup</label>
//                   <input className="form-control" value="237 West Thames Street" readOnly />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Phone</label>
//                   <input className="form-control" value="2122333230" readOnly />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Email</label>
//                   <input className="form-control" value="albert@abcsupply.com" readOnly />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Other</label>
//                   <input className="form-control" value="-" readOnly />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Vendor Type</label>
//                   <select
//                     className="form-select"
//                     value={vendorType}
//                     onChange={e => setVendorType(e.target.value)}
//                   >
//                     <option value="">Select a vendor type</option>
//                     <option>Materials supplier</option>
//                     <option>Subcontractor</option>
//                     <option>Equipment supplier</option>
//                     <option>Miscellaneous expenses</option>
//                   </select>
//                 </div>
//                 {vendorType === "Subcontractor" && (
//                   <div className="col-md-6">
//                     <label className="form-label">Role/Trade</label>
//                     <input
//                       className="form-control"
//                       value={roleTrade}
//                       onChange={e => setRoleTrade(e.target.value)}
//                       placeholder="Enter role or trade"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
//               <button className="btn btn-primary">Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={`modal fade ${showUserModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: showUserModal ? 'rgba(0,0,0,0.3)' : 'none' }}>
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">User Details</h5>
//               <button type="button" className="btn-close" onClick={() => setShowUserModal(false)}></button>
//             </div>
//             <div className="modal-body">
//               <p><b>Name:</b> Albert Brenamen</p>
//               <p><b>Email:</b> albert@abcsupply.com</p>
//               <p><b>Phone:</b> (212) 233-3230</p>
//             </div>
//             <div className="modal-footer">
//               <button className="btn btn-secondary" onClick={() => setShowUserModal(false)}>Close</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h4 className="fw-bold">Vendors</h4>
//         <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add new vendor</button>
//       </div>

//       {/* Tabs */}
//       <ul className="nav nav-tabs mb-3">
//         <li className="nav-item">
//           <a className="nav-link active" href="#">Manage Vendors</a>
//         </li>
//         <li className="nav-item">
//           <a
//             className="nav-link"
//             href="/subcontractor-report.xlsx"
//             download="subcontractor-report.xlsx"
//           >
//             Subcontractor Report
//           </a>
//         </li>
//       </ul>

//       {/* Search & Filters */}
//       <div className="d-flex align-items-center mb-3">
//         <div className="input-group me-3" style={{ maxWidth: '300px' }}>
//           <input type="text" className="form-control" placeholder="Search" />
//           <button className="btn btn-outline-secondary" type="button">
//             <FaSearch />
//           </button>
//         </div>
//         <div className="flex-grow-1 d-flex align-items-center justify-content-between">
//           <div className="form-check d-flex align-items-center">
//             <input className="form-check-input" type="checkbox" id="inactiveCheck" />
//             <label className="form-check-label ms-2" htmlFor="inactiveCheck">
//               Show Inactive
//             </label>
//           </div>
//           <button className="btn btn-outline-secondary rounded ms-3" type="button">
//             Export to XLS
//           </button>
//         </div>
//       </div>

//       {/* Vendor Table */}
//       <div className="table-responsive">
//         <table className="table table-hover align-middle">
//           <thead className="table-light">
//             <tr>
//               <th scope="col">Vendor ⯅</th>
//               <th scope="col">Approved to be spent</th>
//               <th scope="col">Outstanding bills</th>
//               <th scope="col" className="text-end">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <a href="#" className="text-decoration-none text-primary">ABC Supply</a>
//               </td>
//               <td>$14,000.00</td>
//               <td>$5,400.00</td>
//               <td className="text-end">
//                 <button className="btn btn-outline-primary me-2" onClick={() => setShowEditModal(true)}><FaEdit /></button>
//                 <button className="btn btn-outline-primary" onClick={() => setShowUserModal(true)}><FaUser /></button>

//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <a href="#" className="text-decoration-none text-primary">
//                   Cheadle Demolition
//                 </a>
//                 <span className="badge bg-secondary ms-2">SUB</span>
//                 <span className="badge bg-secondary ms-1">DOCS</span>
//               </td>
//               <td>$30,000.00</td>
//               <td>$10,000.00</td>
//               <td className="text-end">
//                 <button className="btn btn-outline-primary me-2" onClick={() => setShowEditModal(true)}><FaEdit /></button>

//                 <button className="btn btn-outline-primary" onClick={() => setShowUserModal(true)}><FaUser /></button>

//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Footer Controls */}
//       <div className="d-flex justify-content-between align-items-center mt-3">
//         <span>1-2 of 2</span>
//         <div>
//           <button className="btn btn-light btn-sm me-2">‹</button>
//           <button className="btn btn-light btn-sm">›</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorsPage;

import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaSearch, FaEdit, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createVendor, fetchAllVendors, updateVendor } from '../../slices/vendorSlice';


const VendorsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vendors, loading, error } = useSelector((state) => state.vendor);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [vendorType, setVendorType] = useState("");
  const [roleTrade, setRoleTrade] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorName, setVendorName] = useState("");
  const [contactName, setContactName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [other, setOther] = useState("");


  useEffect(() => {
    dispatch(fetchAllVendors());
  }, [dispatch]);

  const handleAddVendor = () => {
    const vendorData = {
      name: vendorName,
      contactName: contactName,
      address: address,
      phone: phone,
      email: email,
      other: other,
      vendorType: vendorType,
      roleTrade: vendorType === "Subcontractor" ? roleTrade : undefined,
    };

    dispatch(createVendor(vendorData)); // Dispatch the action to create a vendor
    setShowAddModal(false); // Close the modal
  };


  const handleUpdateVendor = () => {
    const vendorData = {
      id: selectedVendor._id,
      data: {
        name: "ABC Supply", // Replace with actual input values
        contactName: "Albert Brenamen",
        address: "237 West Thames Street",
        phone: "2122333230",
        email: "albert@abcsupply.com",
        vendorType,
        roleTrade: vendorType === "Subcontractor" ? roleTrade : undefined,
      },
    };
    dispatch(updateVendor(vendorData));
    setShowEditModal(false);
  };

  return (
    <div className="container-fluid p-4">
      {/* Back Button */}
      <div className="mb-2">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-1" /> Back
        </button>
      </div>

      {/* Add Vendor Modal */}
      <div className={`modal fade ${showAddModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: showAddModal ? 'rgba(0,0,0,0.3)' : 'none' }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Vendor</h5>
              <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Vendor Name</label>
                  <input
                    className="form-control"
                    value={vendorName}
                    onChange={e => setVendorName(e.target.value)}
                    placeholder="Enter vendor name"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contact Name</label>
                  <input
                    className="form-control"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="Enter contact name"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Address Lookup</label>
                  <input
                    className="form-control"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Enter address"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Other</label>
                  <input
                    className="form-control"
                    value={other}
                    onChange={e => setOther(e.target.value)}
                    placeholder="Enter other details"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Vendor Type</label>
                  <select
                    className="form-select"
                    value={vendorType}
                    onChange={e => setVendorType(e.target.value)}
                  >
                    <option value="">Select a vendor type</option>
                    <option>Materials supplier</option>
                    <option>Subcontractor</option>
                    <option>Equipment supplier</option>
                    <option>Miscellaneous expenses</option>
                  </select>
                </div>
                {vendorType === "Subcontractor" && (
                  <div className="col-md-6">
                    <label className="form-label">Role/Trade</label>
                    <input
                      className="form-control"
                      value={roleTrade}
                      onChange={e => setRoleTrade(e.target.value)}
                      placeholder="Enter role or trade"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddVendor}>Submit</button>
            </div>
          </div>
        </div>
      </div>


      {/* Edit Vendor Modal */}
      <div className={`modal fade ${showEditModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ background: showEditModal ? 'rgba(0,0,0,0.3)' : 'none' }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Vendor</h5>
              <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                {/* Vendor Type and Role/Trade Fields */}
                <div className="col-md-6">
                  <label className="form-label">Vendor Type</label>
                  <select
                    className="form-select"
                    value={vendorType}
                    onChange={e => setVendorType(e.target.value)}
                  >
                    <option value="">Select a vendor type</option>
                    <option>Materials supplier</option>
                    <option>Subcontractor</option>
                    <option>Equipment supplier</option>
                    <option>Miscellaneous expenses</option>
                  </select>
                </div>
                {vendorType === "Subcontractor" && (
                  <div className="col-md-6">
                    <label className="form-label">Role/Trade</label>
                    <input
                      className="form-control"
                      value={roleTrade}
                      onChange={e => setRoleTrade(e.target.value)}
                      placeholder="Enter role or trade"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleUpdateVendor}>Submit</button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Vendors</h4>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add new vendor</button>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <a className="nav-link active" href="#">Manage Vendors</a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="/subcontractor-report.xlsx"
            download="subcontractor-report.xlsx"
          >
            Subcontractor Report
          </a>
        </li>
      </ul>

      {/* Search & Filters */}
      <div className="d-flex align-items-center mb-3">
        <div className="input-group me-3" style={{ maxWidth: '300px' }}>
          <input type="text" className="form-control" placeholder="Search" />
          <button className="btn btn-outline-secondary" type="button">
            <FaSearch />
          </button>
        </div>
        <div className="flex-grow-1 d-flex align-items-center justify-content-between">
          <div className="form-check d-flex align-items-center">
            <input className="form-check-input" type="checkbox" id="inactiveCheck" />
            <label className="form-check-label ms-2" htmlFor="inactiveCheck">
              Show Inactive
            </label>
          </div>
          <button className="btn btn-outline-secondary rounded ms-3" type="button">
            Export to XLS
          </button>
        </div>
      </div>

      {/* Vendor Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">Vendor</th>
              <th scope="col">Approved to be spent</th>
              <th scope="col">Outstanding bills</th>
              <th scope="col" className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(vendor => (
              <tr key={vendor._id}>
                <td>
                  <a href="#" className="text-decoration-none text-primary">{vendor.name}</a>
                </td>
                <td>{vendor.approvedToBeSpent}</td>
                <td>{vendor.outstandingBills}</td>
                <td className="text-end">
                  <button className="btn btn-outline-primary me-2" onClick={() => {
                    setSelectedVendor(vendor);
                    setVendorType(vendor.vendorType);
                    setRoleTrade(vendor.roleTrade || "");
                    setShowEditModal(true);
                  }}><FaEdit /></button>
                  <button className="btn btn-outline-primary" onClick={() => {
                    // Show user modal logic here
                  }}><FaUser /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorsPage;
