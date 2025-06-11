const alertStyles = {
    success: {
        backgroundColor: "#d4edda",
        textColor: "#155724",
        borderColor: "#c3e6cb",
    },
    error: {
        backgroundColor: "#f8d7da",
        textColor: "#721c24",
        borderColor: "#f5c6cb",
    },
    warning: {
        backgroundColor: "#fff3cd",
        textColor: "#856404",
        borderColor: "#ffeeba",
    },
    info: {
        backgroundColor: "#d1ecf1",
        textColor: "#0c5460",
        borderColor: "#bee5eb",
    },
};

const AlertBox = ({ type = "success", message = "", onClose }) => {
    const { backgroundColor, textColor, borderColor } =
        alertStyles[type] || alertStyles.success;

    if (!message) return null; // Don't show if no message

    return (
        <div
            className="alert d-flex justify-content-between align-items-center"
            style={{
                backgroundColor,
                color: textColor,
                border: `1px solid ${borderColor}`,
                borderRadius: "0.375rem",
                padding: "0.75rem 1.25rem",
                marginBottom: "1rem",
            }}
        >
            <div>{message}</div>
            <button
                onClick={onClose}
                style={{
                    background: "transparent",
                    border: "none",
                    color: textColor,
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                }}
            >
                &times;
            </button>
        </div>
    );
};

export default AlertBox;
