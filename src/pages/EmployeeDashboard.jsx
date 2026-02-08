
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const EmployeeDashboard = () => {
    const { logout, user } = useAuth();
    const { leaves, courses } = useData();

    // Filter data for current user
    const myLeaves = leaves.filter(l => l.employeeId === user.id);
    const myCourses = courses.filter(c => c.employeeId === user.id).sort((a, b) => a.priority - b.priority);

    return (
        <div className="dashboard">
            <header>
                <div>
                    <h2>لوحة الموظف</h2>
                    <p className="welcome-text">أهلاً بك، {user.name} ({user.department})</p>
                </div>
                <button onClick={logout} className="btn-secondary">تسجيل خروج</button>
            </header>

            <main className="employee-view">
                <div className="section-card">
                    <h3>سجل الإجازات</h3>
                    {myLeaves.length === 0 ? (
                        <p className="empty-state">لا توجد إجازات مسجلة.</p>
                    ) : (
                        <>
                            <div className="desktop-table">
                                <div className="table-responsive">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>تاريخ البدء</th>
                                                <th>تاريخ الانتهاء</th>
                                                <th>الحالة</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myLeaves.map(leave => (
                                                <tr key={leave.id}>
                                                    <td>{leave.startDate}</td>
                                                    <td>{leave.endDate}</td>
                                                    <td>
                                                        <span className={`status-badge status-${leave.status.toLowerCase()}`}>
                                                            {leave.status === 'Taken' ? 'تم التمتع بها' :
                                                                leave.status === 'Pending' ? 'قيد الانتظار' : 'مرفوضة'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="mobile-cards">
                                {myLeaves.map(leave => (
                                    <div key={leave.id} className="mobile-card-item">
                                        <div className="mobile-card-row">
                                            <span className="label">من</span>
                                            <span className="value">{leave.startDate}</span>
                                        </div>
                                        <div className="mobile-card-row">
                                            <span className="label">إلى</span>
                                            <span className="value">{leave.endDate}</span>
                                        </div>
                                        <div className="mobile-card-row">
                                            <span className="label">الحالة</span>
                                            <span className={`status-badge status-${leave.status.toLowerCase()}`}>
                                                {leave.status === 'Taken' ? 'تم التمتع بها' :
                                                    leave.status === 'Pending' ? 'قيد الانتظار' : 'مرفوضة'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="section-card">
                    <h3>الدورات التدريبية</h3>
                    {myCourses.length === 0 ? (
                        <p className="empty-state">لا توجد دورات مسجلة.</p>
                    ) : (
                        <>
                            <div className="desktop-table">
                                <div className="table-responsive">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>اسم الدورة</th>
                                                <th>الأولوية</th>
                                                <th>التاريخ</th>
                                                <th>الحالة</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myCourses.map(course => (
                                                <tr key={course.id}>
                                                    <td>{course.name}</td>
                                                    <td><span className="priority-badge">{course.priority}</span></td>
                                                    <td>{course.date || '-'}</td>
                                                    <td>
                                                        <span className={`status-badge status-${course.status.toLowerCase()}`}>
                                                            {course.status === 'Completed' ? 'مكتمل' : 'مسجل'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="mobile-cards">
                                {myCourses.map(course => (
                                    <div key={course.id} className="mobile-card-item">
                                        <div className="mobile-card-row">
                                            <span className="label">الدورة</span>
                                            <span className="value">{course.name}</span>
                                        </div>
                                        <div className="mobile-card-row">
                                            <span className="label">الأولوية</span>
                                            <span className="priority-badge">{course.priority}</span>
                                        </div>
                                        <div className="mobile-card-row">
                                            <span className="label">التاريخ</span>
                                            <span className="value">{course.date || '-'}</span>
                                        </div>
                                        <div className="mobile-card-row">
                                            <span className="label">الحالة</span>
                                            <span className={`status-badge status-${course.status.toLowerCase()}`}>
                                                {course.status === 'Completed' ? 'مكتمل' : 'مسجل'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EmployeeDashboard;
