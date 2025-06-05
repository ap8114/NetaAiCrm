import React from 'react'
import './AdminHome.css'
import { Link } from 'react-router-dom'

const AdminHome = () => {
  // Search input handler
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      alert('Searching for: ' + e.target.value)
    }
  }

  // Dropdown item click handler
  const handleDropdownClick = (e, text) => {
    e.preventDefault()
    alert('Creating new: ' + text)
  }

  return (

    <>
      {/* Main content area */}
      <div className="container-fluid kn-container">

        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <h1 className="kn-welcome-text">
                Welcome, <span className="kn-highlight">NetaAI</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="kn-setup-card">
                <div className="kn-progress-header">
                  Getting to know NetaAI • Level 1 of 3
                </div>
                <div className="kn-progress-bar">
                  <div className="kn-progress-fill" />
                </div>
                <div className="kn-task-item">
                  <div className="kn-task-icon">
                    <i className="fas fa-check" />
                  </div>
                  <div className="kn-task-text">Upload logo</div>
                </div>
                <div
                  className="text-muted ms-5"
                  style={{
                    fontSize: '0.875rem',
                    marginTop: '-0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  It will make all your document outputs look more professional.
                </div>
                <div className="kn-task-item">
                  <div className="kn-task-icon">
                    <i className="fas fa-check" />
                  </div>
                  <div className="kn-task-text">Enter company address</div>
                </div>
                <div className="kn-task-item kn-task-pending">
                  <div className="kn-task-icon">
                    <i className="fas fa-check" />
                  </div>
                  <div className="kn-task-text">Enter first project</div>
                </div>
                <a href="#" className="kn-start-btn">
                  Start now <i className="fas fa-arrow-right ms-2" />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="kn-quickbooks-card">
                <div className="kn-dots">
                  <i
                    className="fas fa-circle"
                    style={{ fontSize: 8, marginRight: 4 }}
                  />
                  <i
                    className="fas fa-circle"
                    style={{ fontSize: 8, opacity: '0.5' }}
                  />
                </div>
                <div className="kn-qb-icon">
                  <i className="fas fa-dollar-sign" style={{ fontSize: '1.5rem' }} />
                </div>
                <div className="kn-qb-title">
                  Would you like to connect to QuickBooks?
                </div>
                <div className="kn-qb-description">
                  Connect and say goodbye to double entry. Our automatic,
                  bi-directional sync will save you hours of time.
                </div>
                <a href="#" className="kn-connect-btn">
                  Connect now <i className="fas fa-external-link-alt ms-2" />
                </a>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <h2 className="kn-section-title">Jump right into</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 col-md-6 col-sm-6 mb-4">
              <div className="kn-category-title">CORE</div>
              <Link to="/ContractJobs" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-file-contract" />
                  </div>
                  <div className="kn-menu-text">Contract Jobs</div>
                </div>
              </Link>
              <Link to="/serviceprocard" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div className="kn-menu-text">Service Jobs</div>
                  <span className="kn-upgrade-badge">Upgrade</span>
                </div>
              </Link>
              <Link to="/internalprojects" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-project-diagram" />
                  </div>
                  <div className="kn-menu-text">Internal Projects</div>
                </div>
              </Link>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 mb-4">
              <div className="kn-category-title">TRANSACTIONS</div>
              <Link to="/purchasesdata" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-shopping-cart" />
                  </div>
                  <div className="kn-menu-text">Purchases</div>
                </div>
              </Link>
              <Link to="#" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-file-invoice" />
                  </div>
                  <div className="kn-menu-text">Bills</div>
                  <span className="kn-badge">2 overdue</span>
                </div>
              </Link>
              <Link to="#" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-receipt" />
                  </div>
                  <div className="kn-menu-text">Invoices</div>
                  <span className="kn-badge">2 overdue</span>
                </div>
              </Link>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 mb-4">
              <div className="kn-category-title">ACTIVITY</div>
              <Link to="#" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-clock" />
                  </div>
                  <div className="kn-menu-text">Time Tracker</div>
                </div>
              </Link>
              <Link to="#" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-calendar-alt" />
                  </div>
                  <div className="kn-menu-text">Scheduling</div>
                </div>
              </Link>
              <Link to="#" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-tasks" />
                  </div>
                  <div className="kn-menu-text">Tasks</div>
                </div>
              </Link>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 mb-4">
              <div className="kn-category-title">INSIGHTS</div>
              <Link to="dashboard" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-tachometer-alt" />
                  </div>
                  <div className="kn-menu-text">Dashboard</div>
                </div>
              </Link>
              <Link to="/reportspage" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-chart-bar" />
                  </div>
                  <div className="kn-menu-text">Reports</div>
                </div>
              </Link>
              <Link to="/leadopportunities" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-user" />
                  </div>
                  <div className="kn-menu-text">Leads</div>
                </div>
              </Link>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 mb-4">
              <div className="kn-category-title">COMPANY</div>
              <Link to="/clientdata" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-users" />
                  </div>
                  <div className="kn-menu-text ">
                   Clients</div>
                </div>
              </Link>
              <Link to="/vendorspage" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-truck" />
                  </div>
                  <div className="kn-menu-text">Vendors</div>
                </div>
              </Link>
              <Link to="#" className="kn-menu-item">
                <div className="kn-menu-item-content">
                  <div className="kn-menu-icon">
                    <i className="fas fa-tags" />
                  </div>
                  <div className="kn-menu-text">Catalog</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome