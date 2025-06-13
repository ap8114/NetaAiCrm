import { FaCalendarAlt, FaClock, FaCube, FaFileAlt, FaFileInvoice, FaHandHoldingUsd, FaProjectDiagram, FaTasks, FaTimes, FaTruck, FaUser } from "react-icons/fa";
import DropdownSection from "./DropdownSection";

const MobileAddNew = ({ setShowMobileMenu, setShowMobileAddNew }) => (
    <div className="p-3 border rounded bg-light mt-2">
        <button className="btn btn-light border-0 d-lg-none" onClick={() => { setShowMobileMenu(false); setShowMobileAddNew(false); }}>
            <FaTimes size={24} />
        </button>
        <DropdownSection title="Core" links={[
            { to: "/ContractJobs", icon: <FaFileAlt className="me-2" />, text: "Contract job" },
            { to: "/InternalProjects", icon: <FaProjectDiagram className="me-2" />, text: "Internal project" },
        ]} />
        <DropdownSection title="Transactions" links={[
            { to: "/purchasesData", icon: <FaHandHoldingUsd className="me-2" />, text: "Purchase" },
            { to: "/BillsTab", icon: <FaFileInvoice className="me-2" />, text: "Bill" },
            { to: "/InvoiceDashboard", icon: <FaFileInvoice className="me-2" />, text: "Invoice" },
        ]} />
        <DropdownSection title="Activity" links={[
            { to: "/TimeTracker", icon: <FaClock className="me-2" />, text: "Time" },
            { to: "/CalendarView", icon: <FaCalendarAlt className="me-2" />, text: "Allocation" },
            { to: "/Tasks", icon: <FaTasks className="me-2" />, text: "Task" },
        ]} />
        <DropdownSection title="Company" links={[
            { to: "/ClientsData", icon: <FaUser Tie className="me-2" />, text: "Client" },
            { to: "/VendorsPage", icon: <FaTruck className="me-2" />, text: "Vendor" },
            { to: "/CataLog", icon: <FaCube className="me-2" />, text: "Product" },
        ]} />
    </div>
);

export default MobileAddNew;