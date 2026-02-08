
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import EmployeeList from '../components/EmployeeList';
import AdminOverview from '../components/AdminOverview';

const AdminDashboard = () => {
    const { logout, user } = useAuth();
    const { employees, addEmployee } = useData();
    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        username: '',
        password: '',
        joinDate: new Date().toISOString().split('T')[0]
    });

    const tabs = [
        { id: 'overview', label: 'لوحة المتابعة' },
        { id: 'junior', label: 'الموظفين المبتدئين' },
        { id: 'senior', label: 'الموظفين المتقدمين' },
        { id: 'messenger', label: 'المراسلين' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeType = activeTab === 'overview' ? (formData.type || 'junior') : activeTab;
        await addEmployee(employeeType, formData);
        setShowModal(false);
        setFormData({
            name: '',
            department: '',
            username: '',
            password: '',
            joinDate: new Date().toISOString().split('T')[0]
        });
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setMobileMenuOpen(false);
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
                <div className="header-actions desktop-only">
                    <button onClick={() => setShowModal(true)} className="btn-primary" style={{ width: 'auto' }}>
                        + إضافة موظف
                    </button>
                    <button onClick={logout} className="btn-secondary">تسجيل خروج</button>
                </div>
                <button
                    className="hamburger-btn"
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="القائمة"
                >
                    <span className="hamburger-icon"></span>
                </button>
            </header>

            {/* Mobile Menu */}
            <div
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'visible' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            />
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <h3>القائمة</h3>
                    <button onClick={() => setMobileMenuOpen(false)} className="close-btn">&times;</button>
                </div>
                <div className="mobile-menu-items">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={activeTab === tab.id ? 'active' : ''}
                            onClick={() => handleTabChange(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                    <button
                        className="btn-primary"
                        onClick={() => { setShowModal(true); setMobileMenuOpen(false); }}
                    >
                        + إضافة موظف
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                    >
                        تسجيل خروج
                    </button>
                </div>
            </div>

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
                {activeTab === 'overview' ? (
                    <AdminOverview />
                ) : (
                    <EmployeeList type={activeTab} data={employees[activeTab]} />
                )}
            </main>

            {showModal && (
                <div className="modal-overlay" onClick={(e) => {
                    if (e.target === e.currentTarget) setShowModal(false);
                }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>إضافة موظف جديد {activeTab !== 'overview' ? `(${tabs.find(t => t.id === activeTab)?.label})` : ''}</h2>
                            <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {activeTab === 'overview' && (
                                <div className="form-group">
                                    <label>نوع الموظف</label>
                                    <select
                                        className="user-select"
                                        value={formData.type || 'junior'}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="junior">موظف مبتدئ</option>
                                        <option value="senior">موظف متقدم</option>
                                        <option value="messenger">مراسل</option>
                                    </select>
                                </div>
                            )}
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
