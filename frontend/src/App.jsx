import { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Coffee, Package, DollarSign, X, Check, Loader2 } from 'lucide-react'

const API_BASE_URL = 'http://localhost:8080/api/product'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '', price: '' })
  const [submitting, setSubmitting] = useState(false)

  // Fetch products on load
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_BASE_URL)
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback for demo if backend is not running
      // setProducts([
      //   { id: '1', name: 'Premium Espresso', description: 'Rich and creamy dark roast blend.', price: 45.00 },
      //   { id: '2', name: 'Gold Foil Latte', description: 'Artisan latte with edible gold leaf.', price: 120.00 }
      // ])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price) return

    try {
      setSubmitting(true)
      const response = await axios.post(API_BASE_URL, {
        ...formData,
        price: parseFloat(formData.price)
      })

      // Success! Refresh list and close modal
      setProducts([...products, response.data])
      setModalOpen(false)
      setFormData({ name: '', description: '', price: '' })
    } catch (error) {
      console.error('Error creating product:', error)
      alert("Error: " + (error.response?.data?.message || "Could not connect to backend server. Make sure Spring Boot is running on port 8080."))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app-container">
      <header className="glass-panel">
        <div className="logo-section">
          <img src="/logo.png" alt="JavaCoffee Logo" />
          <h1>JavaCoffee</h1>
        </div>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={20} />
          Create Product
        </button>
      </header>

      <main>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
            <span className="loader"></span>
          </div>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="card-inner glass-panel">
                  <img src="/product-placeholder.png" alt={product.name} className="product-image" />
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
            <h2>No products discovered yet</h2>
            <p>Start your collection by clicking the Create Product button.</p>
          </div>
        )}
      </main>

      {/* Create Product Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <div className="modal-header">
              <h2>New Artisan Product</h2>
              <button className="close-btn" onClick={() => setModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Signature Dark Roast"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Tell us about the flavour profile..."
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Price (USD)</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="0.00"
                    style={{ paddingLeft: '2rem' }}
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary submit-btn" disabled={submitting}>
                {submitting ? (
                  <Loader2 className="rotation" size={20} animation="rotation 1s linear infinite" />
                ) : (
                  <>
                    <Check size={20} />
                    Finalize Product
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
