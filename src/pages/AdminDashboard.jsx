
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import EmployeeList from '../components/EmployeeList';

const AdminDashboard = () => {
    const { logout, user } = useAuth();
    const { employees, addEmployee } = useData();
    const [activeTab, setActiveTab] = useState('junior');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        username: '',
        password: '',
        joinDate: new Date().toISOString().split('T')[0]
    });

    const tabs = [
        { id: 'junior', label: 'الموظفين المبتدئين' },
        { id: 'senior', label: 'الموظفين المتقدمين' },
        { id: 'messenger', label: 'المراسلين' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addEmployee(activeTab, formData);
        setShowModal(false);
        setFormData({
            name: '',
            department: '',
            username: '',
            password: '',
            joinDate: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <div className="dashboard">
            <header>
                <div className="header-brand">
                    <img src="/logo.svg" alt="Logo" className="header-logo" />
                    <div>
                        <h2>لوحة تحكم المسؤول</h2>
                        <p className="welcome-text">أهلاً بك، {user.name}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setShowModal(true)} className="btn-primary" style={{ width: 'auto' }}>
                        + إضافة موظف
                    </button>
                    <button onClick={logout} className="btn-secondary">تسجيل خروج</button>
                </div>
            </header>

            <div className="tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <main className="tab-content">
                <EmployeeList type={activeTab} data={employees[activeTab]} />
            </main>

            {showModal && (
                <div className="modal-overlay" onClick={(e) => {
                    if (e.target === e.currentTarget) setShowModal(false);
                }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>إضافة موظف جديد ({tabs.find(t => t.id === activeTab)?.label})</h2>
                            <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>الاسم الكامل</label>
                                <input
                                    type="text"
                                    className="user-select"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>اسم المستخدم</label>
                                <input
                                    type="text"
                                    className="user-select"
                                    required
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>كلمة المرور</label>
                                <input
                                    type="text"
                                    className="user-select"
                                    required
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>القسم</label>
                                <input
                                    type="text"
                                    className="user-select"
                                    required
                                    value={formData.department}
                                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>تاريخ الانضمام</label>
                                <input
                                    type="date"
                                    className="user-select"
                                    required
                                    value={formData.joinDate}
                                    onChange={e => setFormData({ ...formData, joinDate: e.target.value })}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1 }}>
                                    إلغاء
                                </button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                                    حفظ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
