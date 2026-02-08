
import React, { createContext, useContext } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    // Real-time synchronization with DB
    const employees = useLiveQuery(async () => {
        const juniors = await db.users.where('type').equals('junior').toArray();
        const seniors = await db.users.where('type').equals('senior').toArray();
        const messengers = await db.users.where('type').equals('messenger').toArray();
        return { junior: juniors, senior: seniors, messenger: messengers };
    });

    const leaves = useLiveQuery(() => db.leaves.toArray());
    const courses = useLiveQuery(() => db.courses.toArray());

    // Employee Actions
    const addEmployee = async (type, data) => {
        // Use provided credentials or fallbacks?
        // Admin now provides username/password, so we trust them.
        const newUser = {
            ...data,
            role: 'employee',
            type: type,
            // If for some reason they aren't provided (shouldn't happen with required fields), we could have fallbacks,
            // but let's assume valid input from the form.
        };
        await db.users.add(newUser);
    };

    const deleteEmployee = async (type, id) => {
        await db.users.delete(id);
        // Cascade delete related records
        await db.leaves.where('employeeId').equals(id).delete();
        await db.courses.where('employeeId').equals(id).delete();
    };

    // Leave Actions
    const addLeave = async (leave) => {
        await db.leaves.add({ ...leave, status: 'Pending' });
    };

    const deleteLeave = async (id) => {
        await db.leaves.delete(id);
    };

    const updateLeaveStatus = async (id, status) => {
        await db.leaves.update(id, { status });
    };

    // Course Actions
    const addCourse = async (course) => {
        await db.courses.add({ ...course, status: 'Enrolled' });
    };

    const deleteCourse = async (id) => {
        await db.courses.delete(id);
    };

    if (!employees || !leaves || !courses) return <div className="loader"></div>;

    return (
        <DataContext.Provider
            value={{
                employees,
                leaves,
                courses,
                addEmployee,
                deleteEmployee,
                addLeave,
                deleteLeave,
                updateLeaveStatus,
                addCourse,
                deleteCourse,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
