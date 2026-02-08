
import React from 'react';
import EmployeeCard from './EmployeeCard';

const EmployeeList = ({ type, data }) => {
    if (!data) return <div className="loader"></div>;

    if (data.length === 0) {
        return <p className="empty-state">لا يوجد موظفين في هذه القائمة حالياً.</p>;
    }

    return (
        <div className="employee-grid">
            {data.map(emp => (
                <EmployeeCard key={emp.id} emp={emp} />
            ))}
        </div>
    );
};

export default EmployeeList;
