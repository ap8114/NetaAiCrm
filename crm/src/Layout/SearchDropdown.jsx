import { FaClipboardList, FaFileInvoice, FaHome, FaReceipt, FaShoppingCart, FaTruck, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchDropdown = () => (
    <div className="position-absolute bg-white border rounded shadow p-2" style={{ width: "300px", top: "100%", zIndex: 10 }}>
        <div className="mb-2">
            <strong>Jump to section</strong>
            <ul className="list-unstyled ps-2 mt-1">
                <li><Link to="/home" className="text-decoration-none text-dark d-flex align-items-center gap-2"><FaHome /> Home</Link></li>
                <li><Link to="/BillsTab" className="text-decoration-none text-dark d-flex align-items-center gap-2"><FaReceipt /> Bills</Link></li>
                <li><Link to="/ClientsData" className="text-decoration-none text-dark d-flex align-items-center gap-2"><FaUser Friends /> Clients</Link></li>
                <li><Link to="/ContractJobs" className="text-decoration-none text-dark d-flex align-items-center gap-2"><FaClipboardList /> Contract Jobs</Link></li>
                <li><Link to="/InvoiceDashboard" className="text-decoration-none text-dark d-flex align-items-center gap-2"><FaFileInvoice /> Invoices</Link></li>
                <li><Link to="/purchasesData" className="text-decoration-none text-dark d-flex align-items-center gap-2"><FaShoppingCart /> Purchases</Link></li>
                <li><Link to="/VendorsPage" className="text-decoration-none text-dark d-flex align-items-center gap-2"><FaTruck /> Vendors</Link></li>
            </ul>
        </div>
    </div>
);

export default SearchDropdown;