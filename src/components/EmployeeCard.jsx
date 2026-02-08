
import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const EmployeeCard = ({ emp }) => {
    const { leaves, courses, addLeave, deleteLeave, addCourse, deleteCourse } = useData();

    const [leaveData, setLeaveData] = useState({ startDate: '', endDate: '' });
    const [courseData, setCourseData] = useState({ name: '', priority: 1 });

    const empLeaves = leaves.filter(l => l.employeeId === emp.id);
    const empCourses = courses.filter(c => c.employeeId === emp.id).sort((a, b) => a.priority - b.priority);

    const handleAddLeave = (e) => {
        e.preventDefault();
        addLeave({ employeeId: emp.id, ...leaveData });
        setLeaveData({ startDate: '', endDate: '' });
    };

    const handleAddCourse = (e) => {
        e.preventDefault();
        addCourse({ employeeId: emp.id, ...courseData });
        setCourseData({ name: '', priority: 1 });
    };

    return (
        <div className="employee-card">
            <div className="card-header">
                <h3>{emp.name}</h3>
                <span className="badge">{emp.department}</span>
            </div>

            <div className="card-body">
                <div className="section">
                    <h4>الاجازات</h4>
                    <ul className="list-group">
                        {empLeaves.map(leave => (
                            <li key={leave.id} className="list-item">
                                <span className={`status-${leave.status.toLowerCase()}`}>
                                    {leave.startDate} / {leave.endDate}
                                </span>
                                <button onClick={() => deleteLeave(leave.id)} className="btn-icon delete" aria-label="حذف">×</button>
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleAddLeave} className="mini-form">
                        <input type="date" required value={leaveData.startDate} onChange={e => setLeaveData({ ...leaveData, startDate: e.target.value })} />
                        <input type="date" required value={leaveData.endDate} onChange={e => setLeaveData({ ...leaveData, endDate: e.target.value })} />
                        <button type="submit" className="btn-small">إضافة</button>
                    </form>
                </div>

                <div className="section">
                    <h4>الدورات (الأولوية)</h4>
                    <ul className="list-group">
                        {empCourses.map(course => (
                            <li key={course.id} className="list-item">
                                <span>{course.priority} - {course.name}</span>
                                <button onClick={() => deleteCourse(course.id)} className="btn-icon delete" aria-label="حذف">×</button>
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleAddCourse} className="mini-form">
                        <input type="text" placeholder="اسم الدورة" required value={courseData.name} onChange={e => setCourseData({ ...courseData, name: e.target.value })} />
                        <input type="number" placeholder="الأولوية" min="1" max="5" required value={courseData.priority} onChange={e => setCourseData({ ...courseData, priority: parseInt(e.target.value) })} />
                        <button type="submit" className="btn-small">إضافة</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
