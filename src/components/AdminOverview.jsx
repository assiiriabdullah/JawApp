
import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';

const AdminOverview = () => {
    const { employees, leaves, courses } = useData();

    const allEmployees = useMemo(() => {
        if (!employees) return [];
        return [
            ...(employees.junior || []),
            ...(employees.senior || []),
            ...(employees.messenger || []),
        ];
    }, [employees]);

    const employeeMap = useMemo(() => {
        const map = {};
        allEmployees.forEach(emp => {
            map[emp.id] = emp.name;
        });
        return map;
    }, [allEmployees]);

    const stats = useMemo(() => {
        const totalEmployees = allEmployees.length;
        const totalLeaves = leaves.length;
        const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;
        const totalCourses = courses.length;
        const completedCourses = courses.filter(c => c.status === 'Completed').length;
        const enrolledCourses = courses.filter(c => c.status === 'Enrolled').length;
        return { totalEmployees, totalLeaves, pendingLeaves, totalCourses, completedCourses, enrolledCourses };
    }, [allEmployees, leaves, courses]);

    return (
        <div className="admin-overview">
            <div className="overview-stats">
                <div className="stat-card">
                    <div className="stat-number">{stats.totalEmployees}</div>
                    <div className="stat-label">إجمالي الموظفين</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{stats.totalLeaves}</div>
                    <div className="stat-label">إجمالي الإجازات</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{stats.pendingLeaves}</div>
                    <div className="stat-label">إجازات قيد الانتظار</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{stats.totalCourses}</div>
                    <div className="stat-label">إجمالي الدورات</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{stats.completedCourses}</div>
                    <div className="stat-label">دورات مكتملة</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{stats.enrolledCourses}</div>
                    <div className="stat-label">دورات جارية</div>
                </div>
            </div>

            {/* All Vacations Section */}
            <div className="overview-section">
                <h3>جميع الإجازات</h3>
                <div className="overview-table-wrapper">
                    <div className="desktop-table">
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>الموظف</th>
                                        <th>تاريخ البدء</th>
                                        <th>تاريخ الانتهاء</th>
                                        <th>الحالة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaves.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                                لا توجد إجازات مسجلة
                                            </td>
                                        </tr>
                                    ) : (
                                        leaves.map(leave => (
                                            <tr key={leave.id}>
                                                <td className="employee-name-cell">{employeeMap[leave.employeeId] || 'غير معروف'}</td>
                                                <td>{leave.startDate}</td>
                                                <td>{leave.endDate}</td>
                                                <td>
                                                    <span className={`status-badge status-${leave.status.toLowerCase()}`}>
                                                        {leave.status === 'Taken' ? 'تم التمتع بها' :
                                                            leave.status === 'Pending' ? 'قيد الانتظار' : 'مرفوضة'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mobile-cards">
                        {leaves.length === 0 ? (
                            <p className="empty-state">لا توجد إجازات مسجلة</p>
                        ) : (
                            leaves.map(leave => (
                                <div key={leave.id} className="mobile-card-item">
                                    <div className="mobile-card-row">
                                        <span className="label">الموظف</span>
                                        <span className="value employee-name-cell">{employeeMap[leave.employeeId] || 'غير معروف'}</span>
                                    </div>
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
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* All Courses Section */}
            <div className="overview-section">
                <h3>جميع الدورات التدريبية</h3>
                <div className="overview-table-wrapper">
                    <div className="desktop-table">
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>الموظف</th>
                                        <th>اسم الدورة</th>
                                        <th>الأولوية</th>
                                        <th>التاريخ</th>
                                        <th>الحالة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                                لا توجد دورات مسجلة
                                            </td>
                                        </tr>
                                    ) : (
                                        courses.map(course => (
                                            <tr key={course.id}>
                                                <td className="employee-name-cell">{employeeMap[course.employeeId] || 'غير معروف'}</td>
                                                <td>{course.name}</td>
                                                <td><span className="priority-badge">{course.priority}</span></td>
                                                <td>{course.date || '-'}</td>
                                                <td>
                                                    <span className={`status-badge status-${course.status.toLowerCase()}`}>
                                                        {course.status === 'Completed' ? 'مكتمل' : 'مسجل'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mobile-cards">
                        {courses.length === 0 ? (
                            <p className="empty-state">لا توجد دورات مسجلة</p>
                        ) : (
                            courses.map(course => (
                                <div key={course.id} className="mobile-card-item">
                                    <div className="mobile-card-row">
                                        <span className="label">الموظف</span>
                                        <span className="value employee-name-cell">{employeeMap[course.employeeId] || 'غير معروف'}</span>
                                    </div>
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
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
