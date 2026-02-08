import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../db';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for persisted session (optional, for now just load)
    useEffect(() => {
        // Check if user ID is in localStorage
        const savedId = localStorage.getItem('userId');
        if (savedId) {
            db.users.get(parseInt(savedId)).then(u => {
                if (u) setUser(u);
                setLoading(false);
            }).catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        setError(null);
        try {
            const foundUser = await db.users.where('username').equals(username).first();

            if (foundUser && foundUser.password === password) {
                setUser(foundUser);
                localStorage.setItem('userId', foundUser.id);
                return true;
            } else {
                setError('اسم المستخدم أو كلمة المرور غير صحيحة');
                return false;
            }
        } catch (err) {
            setError('حدث خطأ أثناء تسجيل الدخول');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
