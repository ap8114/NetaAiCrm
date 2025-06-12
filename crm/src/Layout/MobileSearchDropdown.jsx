import { FaClipboardList, FaFileInvoice, FaHome, FaReceipt, FaShoppingCart, FaTruck, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileSearchDropdown = ({ setIsOpen }) => (
    <div className="position-absolute bg-white border rounded shadow p-3 w-100" style={{ maxWidth: "100%", top: "100%", left: 0, zIndex: 10 }}>
        <div className="mb-3">
            <strong>Jump to section</strong>
            <ul className="list-unstyled ps-2 mt-2">
                <li><Link to="/home" className="text-decoration-none text-dark d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}><FaHome /> Home</Link></li>
                <li><Link to="/BillsTab" className="text-decoration-none text-dark d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}><FaReceipt /> Bills</Link></li>
                <li><Link to="/ClientsData" className="text-decoration-none text-dark d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}><FaUser Friends /> Clients</Link></li>
                <li><Link to="/ContractJobs" className="text-decoration-none text-dark d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}><FaClipboardList /> Contract Jobs</Link></li>
                <li><Link to="/InvoiceDashboard" className="text-decoration-none text-dark d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}><FaFileInvoice /> Invoices</Link></li>
                <li><Link to="/purchasesData" className="text-decoration-none text-dark d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}><FaShoppingCart /> Purchases</Link></li>
                <li><Link to="/VendorsPage" className="text-decoration-none text-dark d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}><FaTruck /> Vendors</Link></li>
            </ul>
        </div>
        <div className="mt-3">
            <strong>Recently viewed</strong> <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => console.log("Clear recent clicked")}>Clear recent</span>
            <ul className="list-unstyled ps-2 mt-2">
                {/* Recent items can be mapped here */}
            </ul>
        </div>
    </div>
);

export default MobileSearchDropdown;