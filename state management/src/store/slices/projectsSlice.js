import { createSlice } from '@reduxjs/toolkit';
import { sampleProjects } from '../../data/initialData';

// Helper to load projects from localStorage or default to sampleProjects
const loadInitialProjects = () => {
  const saved = localStorage.getItem('flowstate_redux_projects');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing projects from localStorage', e);
    }
  }
  return sampleProjects;
};

const initialState = {
  items: loadInitialProjects(),
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      // action.payload: { title, id?: string }
      const newProject = {
        id: action.payload.id || `p_${Date.now()}`,
        title: action.payload.title,
        totalTasks: 0,
        completedTasks: 0,
      };
      state.items.push(newProject);
      localStorage.setItem('flowstate_redux_projects', JSON.stringify(state.items));
    },
    deleteProject: (state, action) => {
      // action.payload: projectId
      state.items = state.items.filter(p => p.id !== action.payload);
      localStorage.setItem('flowstate_redux_projects', JSON.stringify(state.items));
    },
    // Dynamically synchronize project statistics based on tasks managed by useReducer
    syncProjectStats: (state, action) => {
      const tasks = action.payload; // array of tasks
      state.items.forEach(project => {
        const projectTasks = tasks.filter(t => t.projectId === project.id || t.projectName === project.title);
        project.totalTasks = projectTasks.length;
        project.completedTasks = projectTasks.filter(t => t.completed).length;
      });
      localStorage.setItem('flowstate_redux_projects', JSON.stringify(state.items));
    },
    resetProjects: (state) => {
      state.items = sampleProjects;
      localStorage.setItem('flowstate_redux_projects', JSON.stringify(state.items));
    }
  },
});

export const { addProject, deleteProject, syncProjectStats, resetProjects } = projectsSlice.actions;

export const selectAllProjects = (state) => state.projects.items;
export const selectProjectById = (state, projectId) => 
  state.projects.items.find(p => p.id === projectId);

export default projectsSlice.reducer;
