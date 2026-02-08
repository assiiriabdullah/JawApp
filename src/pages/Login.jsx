
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login, error } = useAuth();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login(formData.username, formData.password);
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img src="/logo.svg" alt="Digital Gate" className="login-logo" />
                <h1>مرحبا بك في نظام إدارة الموظفين</h1>
                <p>الرجاء تسجيل الدخول للمتابعة</p>

                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>اسم المستخدم</label>
                        <input
                            type="text"
                            className="user-select"
                            required
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                            placeholder="مثال: admin أو user2"
                        />
                    </div>

                    <div className="form-group">
                        <label>كلمة المرور</label>
                        <input
                            type="password"
                            className="user-select"
                            required
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            placeholder="كلمة المرور (تجريبي: 123)"
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                    </button>

                    <div className="login-hint">
                        <p>بيانات تجريبية:</p>
                        <small>المسؤول: admin / 123</small><br />
                        <small>الموظف: user2 / 123</small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
