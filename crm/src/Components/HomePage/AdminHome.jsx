import React from 'react'
import './AdminHome.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/plug.png' // Make sure this path is correct

const Home = () => {
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
              {/* Logo and Welcome Heading in one line, centered */}
              <div className="d-flex flex-wrap justify-content-center align-items-center mb-3 gap-3">
                <img
                  src={logo}
                  alt="Supply Logo"
                  style={{ maxHeight: 55, width: "auto" }}
                />
                <h1 className="kn-welcome-text m-0" style={{ fontSize: "2.2rem", fontWeight: 700 }}>
                  Welcome to{' '}
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #d4b41c 30%, #000 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: 700,
                    }}
                  >
                    Bon-Bon
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-10">
              <div className="kn-setup-card mx-auto">
                <div className="kn-progress-header">
                  Getting to know Bon-Bon • Level 1 of 3
                </div>
                <div className="kn-progress-bar">
                  <div className="kn-progress-fill" />
                </div>
                <div className="kn-task-item">
                  <div className="kn-task-icon bg-warning text-dark">
                    <i className="fas fa-check " />
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
                  <div className="kn-task-icon bg-warning text-dark">
                    <i className="fas fa-check" />
                  </div>
                  <div className="kn-task-text">Enter company address</div>
                </div>
                <div className="kn-task-item kn-task-pending">
                  <div className="kn-task-icon bg-warning opacity-50 text-dark">
                    <i className="fas fa-check" />
                  </div>
                  <div className="kn-task-text">Enter first project</div>
                </div>
                <a href="#" className="kn-start-btn">
                  Start now <i className="fas fa-arrow-right ms-2" />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-10 mt-4 mt-lg-0">
              <div className="kn-quickbooks-card mx-auto">
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
            <div className="col-12 text-center">
              <h2 className="kn-section-title">Jump right into</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row justify-content-center">
                {/* CORE */}
                <div className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex flex-column align-items-center">
                  <div className="kn-category-title">CORE</div>
                  <Link to="/ContractJobs" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content ">
                      <div className="kn-menu-icon">
                        <i className="fas fa-file-contract " />
                      </div>
                      <div className="kn-menu-text">Contract Jobs</div>
                    </div>
                  </Link>
                  <Link to="/internalprojects" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-project-diagram" />
                      </div>
                      <div className="kn-menu-text">Internal Projects</div>
                    </div>
                  </Link>
                </div>
                {/* TRANSACTIONS */}
                <div className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex flex-column align-items-center">
                  <div className="kn-category-title">TRANSACTIONS</div>
                  <Link to="/purchasesdata" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-shopping-cart" />
                      </div>
                      <div className="kn-menu-text">Purchases</div>
                    </div>
                  </Link>
                  <Link to="/BillsTab" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-file-invoice" />
                      </div>
                      <div className="kn-menu-text">Bills</div>
                      <span className="kn-badge bg-warning text-dark">2 overdue</span>
                    </div>
                  </Link>
                  <Link to="/InvoiceDashboard" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-receipt" />
                      </div>
                      <div className="kn-menu-text">Invoices</div>
                      <span className="kn-badge bg-warning text-dark">2 overdue</span>
                    </div>
                  </Link>
                </div>
                {/* ACTIVITY */}
                <div className="col-lg-2 col-md-6 col-sm-12 mb-4 d-flex flex-column align-items-center">
                  <div className="kn-category-title">ACTIVITY</div>
                  <Link to="/TimeTracker" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-clock" />
                      </div>
                      <div className="kn-menu-text">Time Tracker</div>
                    </div>
                  </Link>
                  <Link to="/CalendarView" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-calendar-alt" />
                      </div>
                      <div className="kn-menu-text">Scheduling</div>
                    </div>
                  </Link>
                  <Link to="/Tasks" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-tasks" />
                      </div>
                      <div className="kn-menu-text">Tasks</div>
                    </div>
                  </Link>
                </div>
                {/* INSIGHTS */}
                <div className="col-lg-2 col-md-6 col-sm-12 mb-4 d-flex flex-column align-items-center">
                  <div className="kn-category-title">INSIGHTS</div>
                  <Link to="/dashboard" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-tachometer-alt" />
                      </div>
                      <div className="kn-menu-text">Dashboard</div>
                    </div>
                  </Link>
                  <Link to="/ReportsPage" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-chart-bar" />
                      </div>
                      <div className="kn-menu-text">Reports</div>
                    </div>
                  </Link>
                  <Link to="/leadopportunities" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-user" />
                      </div>
                      <div className="kn-menu-text">Leads</div>
                    </div>
                  </Link>
                </div>
                {/* COMPANY */}
                <div className="col-lg-2 col-md-6 col-sm-12 mb-4 d-flex flex-column align-items-center">
                  <div className="kn-category-title">COMPANY</div>
                  <Link to="/ClientsData" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-users" />
                      </div>
                      <div className="kn-menu-text ">
                        Clients</div>
                    </div>
                  </Link>
                  <Link to="/vendorspage" className="kn-menu-item w-100">
                    <div className="kn-menu-item-content">
                      <div className="kn-menu-icon">
                        <i className="fas fa-truck" />
                      </div>
                      <div className="kn-menu-text">Vendors</div>
                    </div>
                  </Link>
                  <Link to="/CataLog" className="kn-menu-item w-100">
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
        </div>
      </div>
    </>
  )
}

export default Home