import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

const emptyProject = { title: '', description: '', githubUrl: '', liveUrl: '', tags: '' };
const emptyPost = { title: '', location: '', content: '', imageUrls: '', category: 'travel' };

export default function AdminPanel() {
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [postForm, setPostForm] = useState(emptyPost);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function loadData() {
    api.get('/projects').then((res) => setProjects(res.data));
    api.get('/blog').then((res) => setPosts(res.data));
  }

  useEffect(() => {
    loadData();
  }, []);

  function logout() {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  }

  async function addProject(e) {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        tags: projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };
      await api.post('/projects', payload);
      setProjectForm(emptyProject);
      setMessage('Project added.');
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Could not add project.');
    }
  }

  async function deleteProject(id) {
    await api.delete(`/projects/${id}`);
    loadData();
  }

  async function addPost(e) {
    e.preventDefault();
    try {
      const payload = {
        ...postForm,
        imageUrls: postForm.imageUrls.split(',').map((u) => u.trim()).filter(Boolean),
      };
      await api.post('/blog', payload);
      setPostForm(emptyPost);
      setMessage('Post added.');
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Could not add post.');
    }
  }

  async function deletePost(id) {
    await api.delete(`/blog/${id}`);
    loadData();
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <span className="eyebrow">// admin panel</span>
            <h2 style={{ fontSize: 26 }}>Manage your site</h2>
          </div>
          <button className="btn btn-ghost" onClick={logout}>Log out</button>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          <button className={tab === 'projects' ? 'btn btn-primary' : 'btn btn-ghost'} onClick={() => setTab('projects')}>
            Projects
          </button>
          <button className={tab === 'posts' ? 'btn btn-primary' : 'btn btn-ghost'} onClick={() => setTab('posts')}>
            Hobbies / Travel posts
          </button>
        </div>

        {message && <p style={{ color: 'var(--blue)', fontSize: 13, marginBottom: 20 }}>{message}</p>}

        {tab === 'projects' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <form onSubmit={addProject} className="card">
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>Add a project</h3>
              <label>Title</label>
              <input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required />
              <label>Description</label>
              <textarea rows={3} value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} required />
              <label>GitHub URL</label>
              <input value={projectForm.githubUrl} onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })} required />
              <label>Live URL (optional)</label>
              <input value={projectForm.liveUrl} onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })} />
              <label>Tags (comma-separated)</label>
              <input value={projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} placeholder="React, Node, MongoDB" />
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>
                Add project
              </button>
            </form>

            <div>
              <h3 style={{ fontSize: 16, marginBottom: 12 }}>Current projects</h3>
              {projects.map((p) => (
                <div key={p._id} className="card" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 13 }}>{p.description}</div>
                  </div>
                  <button className="btn btn-ghost" onClick={() => deleteProject(p._id)}>Delete</button>
                </div>
              ))}
              {projects.length === 0 && <p style={{ color: 'var(--muted)' }}>No projects yet.</p>}
            </div>
          </div>
        )}

        {tab === 'posts' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, paddingBottom: 60 }}>
            <form onSubmit={addPost} className="card">
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>Add a post</h3>
              <label>Category</label>
              <select
                value={postForm.category}
                onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', padding: 12, borderRadius: 8 }}
              >
                <option value="travel">Travel</option>
                <option value="gym">Gym</option>
                <option value="other">Other</option>
              </select>
              <label>Title</label>
              <input value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} required />
              <label>Location (optional)</label>
              <input value={postForm.location} onChange={(e) => setPostForm({ ...postForm, location: e.target.value })} placeholder="e.g. Manali, HP" />
              <label>Content</label>
              <textarea rows={4} value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} required />
              <label>Image URLs (comma-separated — Google Drive, Imgur, etc.)</label>
              <input value={postForm.imageUrls} onChange={(e) => setPostForm({ ...postForm, imageUrls: e.target.value })} placeholder="https://..., https://..." />
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>
                Add post
              </button>
            </form>

            <div>
              <h3 style={{ fontSize: 16, marginBottom: 12 }}>Current posts</h3>
              {posts.map((post) => (
                <div key={post._id} className="card" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="tag">{post.category}</span>
                    <div style={{ fontWeight: 600, marginTop: 6 }}>{post.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 13 }}>{post.content}</div>
                  </div>
                  <button className="btn btn-ghost" onClick={() => deletePost(post._id)}>Delete</button>
                </div>
              ))}
              {posts.length === 0 && <p style={{ color: 'var(--muted)' }}>No posts yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
