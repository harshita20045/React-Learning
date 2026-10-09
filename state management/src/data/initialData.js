export const sampleProjects = [
  { id: 'p1', title: 'Website Redesign', totalTasks: 12, completedTasks: 8 },
  { id: 'p2', title: 'Q3 Marketing Plan', totalTasks: 5, completedTasks: 1 },
  { id: 'p3', title: 'React Learning', totalTasks: 20, completedTasks: 18 }
];

export const sampleTasks = [
  { id: 't1', title: 'Finalize wireframes', projectId: 'p1', projectName: 'Website Redesign', priority: 'high', due: 'Today' },
  { id: 't2', title: 'Draft social posts', projectId: 'p2', projectName: 'Q3 Marketing Plan', priority: 'medium', due: 'Tomorrow' },
  { id: 't3', title: 'Review PRs', projectId: 'p3', projectName: 'React Learning', priority: 'low', due: 'Today' }
];

export const dashboardStats = {
  completedTasks: 12,
  focusMinutes: 145,
  completionRate: 68
};
