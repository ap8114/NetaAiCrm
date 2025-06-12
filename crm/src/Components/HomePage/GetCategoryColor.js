// Helper function to get category color
const getCategoryColor = (category) => {
    switch (category) {
        case 'CORE': return 'primary';
        case 'TRANSACTIONS': return 'primary';
        case 'ACTIVITY': return 'info';
        case 'INSIGHTS': return 'purple';
        case 'COMPANY': return 'orange';
        default: return 'secondary';
    }
};

export default getCategoryColor;