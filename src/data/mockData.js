
export const users = [
  { id: 1, name: 'Admin User', role: 'admin', type: 'admin' },
  { id: 2, name: 'Ahmed (Junior)', role: 'employee', type: 'junior' },
  { id: 3, name: 'Sara (Senior)', role: 'employee', type: 'senior' },
  { id: 4, name: 'Ali (Messenger)', role: 'employee', type: 'messenger' },
];

export const mockEmployees = {
  junior: [
    { id: 2, name: 'Ahmed', type: 'junior', department: 'IT', joinDate: '2023-01-01' },
    { id: 5, name: 'Khaled', type: 'junior', department: 'HR', joinDate: '2023-05-15' },
  ],
  senior: [
    { id: 3, name: 'Sara', type: 'senior', department: 'IT', joinDate: '2020-03-10' },
    { id: 6, name: 'Mona', type: 'senior', department: 'Finance', joinDate: '2019-11-20' },
  ],
  messenger: [
    { id: 4, name: 'Ali', type: 'messenger', department: 'Logistics', joinDate: '2022-07-01' },
    { id: 7, name: 'Hassan', type: 'messenger', department: 'Admin', joinDate: '2021-09-05' },
  ],
};

export const mockLeaves = [
  { id: 1, employeeId: 2, startDate: '2023-10-01', endDate: '2023-10-05', status: 'Taken' },
  { id: 2, employeeId: 2, startDate: '2023-12-20', endDate: '2023-12-25', status: 'Pending' },
  { id: 3, employeeId: 3, startDate: '2023-11-15', endDate: '2023-11-18', status: 'Taken' },
];

export const mockCourses = [
  { id: 1, employeeId: 2, name: 'React Basics', date: '2023-08-01', priority: 1, status: 'Completed' },
  { id: 2, employeeId: 3, name: 'Advanced Leadership', date: '2023-09-10', priority: 2, status: 'Completed' },
  { id: 3, employeeId: 2, name: 'Node.js Fundamentals', date: '2024-01-15', priority: 1, status: 'Enrolled' },
];
