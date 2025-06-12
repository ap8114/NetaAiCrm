import { Link } from "react-router-dom";

const DropdownSection = ({ title, links }) => (
    <div>
        <h6 className="text-uppercase text-muted small">{title}</h6>
        {links.map((link, idx) => (
            <Link key={idx} to={link.to} className="text-dark text-decoration-none d-block mb-2">
                {link.icon} {link.text}
            </Link>
        ))}
    </div>
);

export default DropdownSection;