import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  Folder,
  UploadCloud,
  Activity,
  BarChart2,
  Zap,
  Eye,
  Shield,
  Globe,
  Users,
  Link,
  Box,
  Database,
  Flag,
  Search,
  MoreHorizontal
} from 'lucide-react';

import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedin
} from 'react-icons/fa6';

import doodle1 from './assets/Doodle1.png';
import doodle2 from './assets/Doodle2.png';
import doodle3 from './assets/Doodle3.png';

const DUMMY_CREATORS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    avatar: 'https://i.pravatar.cc/150?img=1',
    platforms: ['instagram', 'tiktok'],
    campaign: 'Summer Splash 2024',
    status: 'Approved',
    updated: '2 hours ago'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    avatar: 'https://i.pravatar.cc/150?img=11',
    platforms: ['youtube'],
    campaign: 'Tech Review Series',
    status: 'Needs Revision',
    updated: '5 hours ago'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=5',
    platforms: ['instagram', 'youtube'],
    campaign: 'Fitness Challenge Q3',
    status: 'Waiting for Submission',
    updated: '1 day ago'
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: 'https://i.pravatar.cc/150?img=8',
    platforms: ['tiktok'],
    campaign: 'Viral Dance Trend',
    status: 'Live',
    updated: '10 mins ago'
  },
  {
    id: 5,
    name: 'Jessica Taylor',
    avatar: 'https://i.pravatar.cc/150?img=9',
    platforms: ['instagram'],
    campaign: 'Skincare Routine',
    status: 'Scheduled',
    updated: '3 hours ago'
  },
  {
    id: 6,
    name: 'Tom Hardy',
    avatar: 'https://i.pravatar.cc/150?img=12',
    platforms: ['youtube', 'linkedin'],
    campaign: 'Gaming Setup Tour',
    status: 'Overdue',
    updated: '2 days ago'
  },
  {
    id: 7,
    name: 'Aisha Patel',
    avatar: 'https://i.pravatar.cc/150?img=20',
    platforms: ['instagram', 'tiktok'],
    campaign: 'Summer Splash 2024',
    status: 'Approved',
    updated: '1 hour ago'
  },
  {
    id: 8,
    name: 'Chris Wilson',
    avatar: 'https://i.pravatar.cc/150?img=33',
    platforms: ['youtube'],
    campaign: 'Tech Review Series',
    status: 'Live',
    updated: '4 hours ago'
  }
];

const PLATFORM_ICONS = {
  instagram: <FaInstagram size={14} />,
  youtube: <FaYoutube size={14} />,
  linkedin: <FaLinkedin size={14} />,
  tiktok: <FaTiktok size={14} />
};

const STATUS_CLASSES = {
  'Approved': 'status-approved',
  'Needs Revision': 'status-needs-revision',
  'Waiting for Submission': 'status-waiting',
  'Scheduled': 'status-scheduled',
  'Live': 'status-live',
  'Overdue': 'status-overdue'
};

function App() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [creatorsCount, setCreatorsCount] = useState('');
  const [headache, setHeadache] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);



  const scrollToSignup = () => {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'waitlist'), {
        email,
        role,
        creatorsCount,
        headache,
        timestamp: new Date()
      });

      // Attempting to skip product page using wanted=true parameter
      const checkoutUrl = `https://trackugc.gumroad.com/l/checkout?wanted=true&email=${encodeURIComponent(email)}`;
      window.location.href = checkoutUrl;

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Stop managing UGC campaigns across Whatsapp, Sheets and Chaos.</h1>
          <p>
            Track every creator, draft, approval, deadline, live link and winning format from a single organized workspace.
          </p>
          <button className="cta-button" onClick={scrollToSignup}>
            Signup for waitlist <span>&gt;&gt;</span>
          </button>
        </div>

        {/* Doodles - Moved back outside to ensure proper background blending */}
        <div className="doodle img-doodle doodle-1">
          <img src={doodle1} alt="" />
        </div>
        <div className="doodle img-doodle doodle-2">
          <img src={doodle2} alt="" />
        </div>
        <div className="doodle img-doodle doodle-3">
          <img src={doodle3} alt="" />
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="dashboard-wrapper">
        <div className="dashboard">

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-header">
              <div className="sidebar-avatar"></div>
              <span>TrackUGC Team</span>
            </div>

            <div className="sidebar-search">
              <Search />
              <input type="text" placeholder="Search..." />
            </div>

            <nav className="sidebar-nav">
              <div className="nav-item active">
                <Folder /> Campaigns
              </div>
              <div className="nav-item">
                <UploadCloud /> Submissions
              </div>
              <div className="nav-item">
                <Activity /> Activity
              </div>
              <div className="nav-item">
                <BarChart2 /> Performance
              </div>
              <div className="nav-item">
                <Zap /> Winning Content
              </div>
              <div className="nav-item">
                <Eye /> Workflow
              </div>
              <div className="nav-item">
                <Shield /> Approvals
              </div>
              <div className="nav-item">
                <Globe /> Live Content
              </div>
              <div className="nav-item">
                <Users /> Creators
              </div>
              <div className="nav-item">
                <Link /> Channels
              </div>
              <div className="nav-item">
                <Box /> Integrations
              </div>
              <div className="nav-item">
                <Database /> Asset Library
              </div>
              <div className="nav-item">
                <Flag /> Briefs
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="main-content">
            <div className="top-nav">
              <div className="top-nav-tabs">
                <div className="top-nav-tab active">Overview</div>
                <div className="top-nav-tab">Analytics</div>
                <div className="top-nav-tab">Settings</div>
              </div>
            </div>

            <div className="content-area">
              <div className="content-header">
                <div className="search-bar">
                  <input type="text" placeholder="Search creators, campaigns..." />
                </div>
                <button className="primary-btn">Add New...</button>
              </div>

              <div className="cards-grid">
                {DUMMY_CREATORS.map(creator => (
                  <div key={creator.id} className="creator-card">
                    <div className="card-header">
                      <div className="creator-info">
                        <img src={creator.avatar} alt={creator.name} className="avatar" />
                        <div className="creator-details">
                          <h3>{creator.name}</h3>
                          <span className="campaign-name">{creator.campaign}</span>
                        </div>
                      </div>
                      <div className="platforms">
                        {creator.platforms.map(p => (
                          <div key={p} className="platform-badge" title={p}>
                            {PLATFORM_ICONS[p]}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="card-body">
                      <div className={`status-badge ${STATUS_CLASSES[creator.status]}`}>
                        <span className="status-dot"></span>
                        {creator.status}
                      </div>
                    </div>

                    <div className="card-footer">
                      <span>Updated {creator.updated}</span>
                      <MoreHorizontal size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

        </div>
      </section>

      {/* Pain Section */}
      <section className="pain-section container">
        <div className="pain-grid">
          <div className="pain-left">
            <div className="messy-stack">
              <div className="messy-item whatsapp">WhatsApp bubbles</div>
              <div className="messy-item sheets">Google Sheets</div>
              <div className="messy-item drive">Drive folders</div>
              <div className="messy-item slack">Slack messages</div>
              <div className="messy-item file">"Final_v4_REAL.mp4"</div>
              <div className="messy-item warning">missed deadline warning</div>
              <div className="messy-item approval">approval DM</div>
              <div className="messy-item links">scattered links</div>
            </div>
          </div>
          <div className="pain-right">
            <h2>Scaling UGC campaigns gets messy fast.</h2>
            <p className="pain-subtitle">It becomes a headache to know:</p>
            <ul className="pain-bullets">
              <li>Which creators have submitted?</li>
              <li>Which videos got approved ?</li>
              <li>What's still missing?</li>
              <li>What's gone live?</li>
              <li>Where all the links are?</li>
              <li>Which content is performing well?</li>
            </ul>

          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="features-section container">
        <h2 className="section-title">How TrackUGC helps you.</h2>
        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-mockup">
              <div className="mockup-header">Creator Submissions</div>
              <div className="mockup-body">
                <div className="mockup-row"><span className="mockup-badge status-live">Submitted</span> Sarah Jenkins - Due today</div>
                <div className="mockup-row"><span className="mockup-badge status-waiting">Pending</span> David Kim - Due tmrw</div>
                <div className="mockup-row"><span className="mockup-badge status-overdue">Overdue</span> Tom Hardy - 2 days ago</div>
              </div>
            </div>
            <div className="feature-content">
              <h3>Track creator submissions in one place</h3>
              <p>See exactly who submitted content, what still needs review, and which creators are overdue.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-mockup">
              <div className="mockup-header">Approvals</div>
              <div className="mockup-body">
                <div className="mockup-comment">"Revision Requested: Please change the hook"</div>
                <div className="mockup-action"><button className="mockup-btn approve">Approve</button> <button className="mockup-btn reject">Reject</button></div>
                <div className="mockup-note">Approved by Sarah (V2)</div>
              </div>
            </div>
            <div className="feature-content">
              <h3>Keep approvals and revisions organized</h3>
              <p>Review content, request changes, and approve assets without losing feedback in chats and DMs.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-mockup">
              <div className="mockup-header">Asset Library</div>
              <div className="mockup-body mockup-flex">
                <div className="mockup-thumb">V1</div>
                <div className="mockup-thumb">V2</div>
                <div className="mockup-thumb final">Final</div>
              </div>
              <div className="mockup-link">Live: tiktok.com/@creator/video</div>
            </div>
            <div className="feature-content">
              <h3>Keep every draft, version, and live link together</h3>
              <p>Store creator uploads, revisions, final exports, and published links in one organized workspace.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-mockup">
              <div className="mockup-header">Campaign Overview</div>
              <div className="mockup-body">
                <div className="mockup-progress">
                  <div className="progress-bar" style={{ width: '60%' }}></div>
                </div>
                <div className="mockup-stats">
                  <span>12 Creators</span>
                  <span>24 Assets</span>
                </div>
                <div className="mockup-badges">
                  <span className="mockup-badge status-waiting">Recording</span>
                  <span className="mockup-badge status-needs-revision">Under Review</span>
                </div>
              </div>
            </div>
            <div className="feature-content">
              <h3>See the status of every campaign instantly</h3>
              <p>Get a real-time overview of what's pending, approved, delayed, and already live.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-mockup">
              <div className="mockup-header">Timeline</div>
              <div className="mockup-body">
                <div className="mockup-timeline-item warning">
                  <span className="date">Oct 12</span> Deliverable Overdue (Jessica)
                </div>
                <div className="mockup-timeline-item">
                  <span className="date">Oct 14</span> Review Deadline (Summer Splash)
                </div>
              </div>
            </div>
            <div className="feature-content">
              <h3>Never lose track of deadlines again</h3>
              <p>Track submission deadlines, overdue deliverables, and campaign timelines from one dashboard.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-mockup">
              <div className="mockup-header">Performance</div>
              <div className="mockup-body">
                <div className="mockup-row space-between"><span>Marcus Chen</span> <span className="highlight">3.2x ROAS</span></div>
                <div className="mockup-row space-between"><span>"Unboxing Hook"</span> <span className="highlight">4.5% CTR</span></div>
                <div className="mockup-winner">🏆 Winning Format</div>
              </div>
            </div>
            <div className="feature-content">
              <h3>See which creators and hooks actually perform</h3>
              <p>Identify your best-performing creators, content styles, and hooks faster.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Built For Section */}
      <section className="built-for">
        <h2>
          Built for teams scaling UGC campaigns.
          <img src={doodle1} className="inline-doodle" alt="" />
        </h2>
      </section>

      {/* Before / After Section */}
      <section className="before-after-section container">
        <h2 className="section-title">From scattered workflows to organized campaigns</h2>
        <div className="comparison-grid">

          <div className="comparison-card before">
            <div className="comparison-header">
              <h3>Without TrackUGC</h3>
            </div>
            <ul className="comparison-list">
              <li><span className="cross">✕</span> approvals buried in DMs</li>
              <li><span className="cross">✕</span> scattered Drive folders</li>
              <li><span className="cross">✕</span> spreadsheets constantly outdated</li>
              <li><span className="cross">✕</span> creators needing manual follow-ups</li>
              <li><span className="cross">✕</span> unclear campaign status</li>
              <li><span className="cross">✕</span> missing live links</li>
            </ul>
            <div className="comparison-visual messy">
              <div className="visual-item">File_Final_v2.mp4</div>
              <div className="visual-item">"Did she post yet?"</div>
              <div className="visual-item">Google Sheet (View Only)</div>
            </div>
          </div>

          <div className="comparison-card after">
            <div className="comparison-header">
              <h3>With TrackUGC</h3>
            </div>
            <ul className="comparison-list">
              <li><span className="check">✓</span> centralized creator tracking</li>
              <li><span className="check">✓</span> organized approvals and revisions</li>
              <li><span className="check">✓</span> real-time campaign visibility</li>
              <li><span className="check">✓</span> every asset and link in one place</li>
              <li><span className="check">✓</span> clear deadlines and statuses</li>
              <li><span className="check">✓</span> performance tied to content</li>
            </ul>
            <div className="comparison-visual clean">
              <div className="visual-item organized"><span className="status-live">Live</span> Summer Campaign Active</div>
              <div className="visual-item organized"><span className="status-approved">Approved</span> 12/12 Videos Ready</div>
            </div>
          </div>

        </div>
      </section>

      {/* Signup Form Section */}
      <section className="signup-section container" id="signup">
        <div className="signup-container">
          <h2 className="section-title">Answer these Questions to get TrackUGC for $5</h2>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">1. Work Email</label>
              <input
                type="email"
                id="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">2. What best describes you?</label>
              <select
                id="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>Select an option</option>
                <option value="DTC Brand">DTC Brand</option>
                <option value="UGC Agency">UGC Agency</option>
                <option value="Marketing Team">Marketing Team</option>
                <option value="Creator-Led Brand">Creator-Led Brand</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="creatorsCount">3. How many creators do you manage monthly?</label>
              <select
                id="creatorsCount"
                required
                value={creatorsCount}
                onChange={(e) => setCreatorsCount(e.target.value)}
              >
                <option value="" disabled>Select an option</option>
                <option value="1–5">1–5</option>
                <option value="6–20">6–20</option>
                <option value="21–50">21–50</option>
                <option value="50+">50+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="headache">4. What's your biggest UGC workflow headache right now?</label>
              <textarea
                id="headache"
                required
                placeholder="What's your biggest pain right now?"
                rows="4"
                value={headache}
                onChange={(e) => setHeadache(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="cta-button submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Signup for $5'}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default App;
