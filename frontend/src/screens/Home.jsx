import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user.context';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(''); // ✅ fix uncontrolled input warning
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  // ✅ Create project with JWT token
  async function createProject(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // get JWT token
      if (!token) {
        alert('Please login first!');
        return;
      }

      const res = await axios.post(
        '/projects/create',
        { name: projectName },
        {
          headers: {
            Authorization: `Bearer ${token}`, // attach token
          },
        }
      );

      console.log('✅ Project created:', res.data);
      setIsModalOpen(false);
      setProjectName('');
      // refresh project list
      fetchProjects();
    } catch (error) {
      console.error('❌ Error creating project:', error);
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  }

  // ✅ Get all projects (with token)
  async function fetchProjects() {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/projects/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error('❌ Error fetching projects:', err);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="p-4">
      <div className="projects flex flex-wrap gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="project p-4 border border-slate-300 rounded-md"
        >
          New Project
          <i className="ri-link ml-2"></i>
        </button>

        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() =>
              navigate(`/project`, {
                state: { project },
              })
            }
            className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200"
          >
            <h2 className="font-semibold">{project.name}</h2>

            <div className="flex gap-2">
              <p>
                <small>
                  <i className="ri-user-line"></i> Collaborators
                </small>{' '}
                :
              </p>
              {project.users?.length || 0}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
