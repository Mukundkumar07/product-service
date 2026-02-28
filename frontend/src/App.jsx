import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Plus, Coffee, Package, DollarSign, X, Check, Loader2,
  Search, Home, Briefcase, Mail, Trash2, LogIn, UserPlus
} from 'lucide-react'

const API_BASE_URL = 'http://localhost:8080/api/product'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '', price: '' })
  const [submitting, setSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAuth, setShowAuth] = useState(null) // 'login', 'register', 'otp'

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts()
    }
  }, [activeTab])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_BASE_URL)
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await axios.delete(`${API_BASE_URL}/${id}`)
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleEmail = (product) => {
    alert(`Sending product details for "${product.name}" to your registered email...`)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const response = await axios.post(API_BASE_URL, {
        ...formData,
        price: parseFloat(formData.price)
      })
      setProducts([...products, response.data])
      setModalOpen(false)
      setFormData({ name: '', description: '', price: '' })
    } catch (error) {
      alert("Error creating product. Details logged to console.")
    } finally {
      setSubmitting(false)
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderHome = () => (
    <div className="section-title">
      <h2>Welcome to JavaCoffee Premium</h2>
      <p>Discover the finest artisan blends and equipment for the modern connoisseur.</p>
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3>Our Mission</h3>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>To bring the world's most exclusive coffee experiences to your doorstep with luxury and precision.</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3>Artisan Services</h3>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>From professional barista training to subscription-based morning deliveries.</p>
        </div>
      </div>
    </div>
  )

  const renderServices = () => (
    <div className="section-title">
      <h2>Artisan Services</h2>
      <p>Exclusive experiences tailored for coffee enthusiasts.</p>
      <div className="product-grid" style={{ marginTop: '2rem' }}>
        {['Subscription Delivery', 'Barista Training', 'Event Catering', 'Repair & Maintenance'].map(s => (
          <div key={s} className="glass-panel" style={{ padding: '2rem' }}>
            <h3>{s}</h3>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Premium {s.toLowerCase()} services starting from $49/mo.</p>
            <button className="btn-outline" style={{ marginTop: '1rem', width: '100%' }}>Inquire Now</button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderProducts = () => (
    <>
      <div className="section-header">
        <div className="section-title">
          <h2>Product Collection</h2>
          <p>Browsing {filteredProducts.length} premium items</p>
        </div>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
          <span className="loader"></span>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-inner glass-panel">
                <div className="card-actions">
                  <button className="action-btn email" onClick={() => handleEmail(product)} title="Sent through email">
                    <Mail size={16} />
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(product.id)} title="Delete product">
                    <Trash2 size={16} />
                  </button>
                </div>
                <img src="/product-placeholder.png" alt={product.name} className="product-card-image" style={{ width: '100%', height: '180px', borderRadius: '16px', objectFit: 'cover' }} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <div className="product-footer">
                  <span className="price">${product.price?.toFixed(2)}</span>
                  <div style={{ color: 'var(--primary)', display: 'flex', gap: '5px' }}>
                    <Coffee size={18} />
                    <Package size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel empty-state">
          <Coffee size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h2>No matches found</h2>
          <p>Try adjusting your search criteria.</p>
        </div>
      )}
    </>
  )

  const renderAuth = () => {
    if (showAuth === 'login') return (
      <div className="auth-container">
        <div className="auth-card glass-panel">
          <div className="auth-header">
            <h2>Luxury Portal</h2>
            <p>Enter your credentials to continue</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setShowAuth('otp'); }}>
            <div className="form-group"><label>Email Address</label><input type="email" placeholder="name@example.com" required /></div>
            <div className="form-group"><label>Password</label><input type="password" placeholder="••••••••" required /></div>
            <button type="submit" className="btn-primary submit-btn">Sign In</button>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
              New client? <span onClick={() => setShowAuth('register')} style={{ color: 'var(--primary)', cursor: 'pointer' }}>Apply for Access</span>
            </p>
          </form>
        </div>
      </div>
    )

    if (showAuth === 'register') return (
      <div className="auth-container">
        <div className="auth-card glass-panel">
          <div className="auth-header">
            <h2>Join the Collection</h2>
            <p>Create your exclusive account</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setShowAuth('login'); }}>
            <div className="form-group"><label>Full Name</label><input type="text" placeholder="John Doe" required /></div>
            <div className="form-group"><label>Email Address</label><input type="email" placeholder="name@example.com" required /></div>
            <div className="form-group"><label>Create Password</label><input type="password" placeholder="••••••••" required /></div>
            <button type="submit" className="btn-primary submit-btn">Request Access</button>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
              Existing client? <span onClick={() => setShowAuth('login')} style={{ color: 'var(--primary)', cursor: 'pointer' }}>Sign In</span>
            </p>
          </form>
        </div>
      </div>
    )

    if (showAuth === 'otp') return (
      <div className="auth-container">
        <div className="auth-card glass-panel">
          <div className="auth-header">
            <h2>Verification Required</h2>
            <p>Enter the OTP sent to your email</p>
          </div>
          <div className="otp-inputs">
            {[1, 2, 3, 4, 5, 6].map(i => <input key={i} className="otp-input glass-panel" maxLength="1" />)}
          </div>
          <button onClick={() => { setShowAuth(null); setActiveTab('home'); }} className="btn-primary submit-btn">Verify & Authenticate</button>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
            Didn't receive it? <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Resend OTP</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar glass-panel">
        <div className="logo-section">
          <img src="/logo.png" alt="Logo" />
          <h1>JavaCoffee</h1>
        </div>
        <nav className="nav-menu">
          <div className={`nav-item ${activeTab === 'home' && !showAuth ? 'active' : ''}`} onClick={() => { setActiveTab('home'); setShowAuth(null); }}>
            <Home size={20} /> Home
          </div>
          <div className={`nav-item ${activeTab === 'products' && !showAuth ? 'active' : ''}`} onClick={() => { setActiveTab('products'); setShowAuth(null); }}>
            <Package size={20} /> Products
          </div>
          <div className={`nav-item ${activeTab === 'services' && !showAuth ? 'active' : ''}`} onClick={() => { setActiveTab('services'); setShowAuth(null); }}>
            <Briefcase size={20} /> Services
          </div>
        </nav>
        <div className="nav-menu" style={{ marginTop: 'auto' }}>
          <div className="nav-item" onClick={() => setShowAuth('login')}>
            <LogIn size={20} /> Login
          </div>
          <div className="nav-item" onClick={() => setShowAuth('register')}>
            <UserPlus size={20} /> Register
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="top-bar">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              className="search-input"
              placeholder="Search premium collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="auth-buttons">
            <button className="btn-outline" onClick={() => alert('Support line: 1-800-JAVA-VIP')}>Help</button>
            <button className="btn-primary" onClick={() => setShowAuth('login')}>Get Started</button>
          </div>
        </div>

        {showAuth ? renderAuth() : (
          activeTab === 'home' ? renderHome() :
            activeTab === 'services' ? renderServices() :
              renderProducts()
        )}
      </main>

      {/* Product Creation Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2>New Artisan Product</h2>
              <button className="close-btn" onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label>Name</label><input name="name" value={formData.name} onChange={handleInputChange} required /></div>
              <div className="form-group"><label>Description</label><textarea name="description" value={formData.description} onChange={handleInputChange} /></div>
              <div className="form-group"><label>Price ($)</label><input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required /></div>
              <button type="submit" className="btn-primary submit-btn" disabled={submitting}>
                {submitting ? <Loader2 className="rotation" size={20} /> : <><Check size={20} /> Finalize Product</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
