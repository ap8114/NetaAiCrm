import { FaCalendarAlt, FaClock, FaCube, FaFileAlt, FaFileInvoice, FaHandHoldingUsd, FaProjectDiagram, FaTasks, FaTruck, FaUser } from "react-icons/fa";
import DropdownSection from "./DropdownSection";

const AddNewDropdown = () => (
    <div className="position-absolute bg-white shadow p-3 mt-2 rounded" style={{ zIndex: 1050, width: "600px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", top: "100%" }}>
        {/* Core */}
        <DropdownSection title="Core" links={[
            { to: "/ContractJobs", icon: <FaFileAlt className="me-2" />, text: "Contract job" },
            { to: "/InternalProjects", icon: <FaProjectDiagram className="me-2" />, text: "Internal project" },
        ]} />
        {/* Transactions */}
        <DropdownSection title="Transactions" links={[
            { to: "/purchasesData", icon: <FaHandHoldingUsd className="me-2" />, text: "Purchase" },
            { to: "/BillsTab", icon: <FaFileInvoice className="me-2" />, text: "Bill" },
            { to: "/InvoiceDashboard", icon: <FaFileInvoice className="me-2" />, text: "Invoice" },
        ]} />
        {/* Activity */}
        <DropdownSection title="Activity" links={[
            { to: "/TimeTracker", icon: <FaClock className="me-2" />, text: "Time" },
            { to: "/CalendarView", icon: <FaCalendarAlt className="me-2" />, text: "Allocation" },
            { to: "/Tasks", icon: <FaTasks className="me-2" />, text: "Task" },
        ]} />
        {/* Company */}
        <DropdownSection title="Company" links={[
            { to: "/ClientsData", icon: <FaUser Tie className="me-2" />, text: "Client" },
            { to: "/VendorsPage", icon: <FaTruck className="me-2" />, text: "Vendor" },
            { to: "/CataLog", icon: <FaCube className="me-2" />, text: "Product" },
        ]} />
    </div>
);

export default AddNewDropdown;