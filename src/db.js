
import Dexie from 'dexie';
import { users, mockLeaves, mockCourses } from './data/mockData';

export const db = new Dexie('EmployeeDB');

db.version(1).stores({
    users: '++id, username, password, role, type',
    leaves: '++id, employeeId, startDate, endDate, status',
    courses: '++id, employeeId, name, priority, date, status'
});

// Seed data if empty
db.on('populate', () => {
    // Transform mock users to include username/password
    const seededUsers = users.map(u => ({
        ...u,
        // Generate simple username/password
        username: u.role === 'admin' ? 'admin' : `user${u.id}`,
        password: '123' // Default password for demo
    }));

    db.users.bulkAdd(seededUsers);
    db.leaves.bulkAdd(mockLeaves);
    db.courses.bulkAdd(mockCourses);
});
