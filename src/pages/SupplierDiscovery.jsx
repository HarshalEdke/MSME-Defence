import React, { useState, useMemo } from 'react'
import { useApp } from '../App'
import { Link } from 'react-router-dom'
import { Search, MapPin, Award, Star } from 'lucide-react'
import { statusBadgeColor } from '../utils/formatters'

export default function SupplierDiscovery() {
  const { state } = useApp()
  const suppliers = state.suppliers
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [location, setLocation] = useState('All')
  const [status, setStatus] = useState('All')
  const [capability, setCapability] = useState('All')
  const [cert, setCert] = useState('All')

  const categories = ['All', ...Array.from(new Set(suppliers.map((s) => s.category)))]
  const locations = ['All', ...Array.from(new Set(suppliers.map((s) => s.location)))]
  const statuses = ['All', 'Draft', 'Submitted', 'Under Review', 'Documents Required', 'Qualified', 'Rejected']
  const capabilities = ['All', ...Array.from(new Set(suppliers.flatMap((s) => s.capabilities)))]
  const certs = ['All', ...Array.from(new Set(suppliers.flatMap((s) => s.certifications)))]

  const filtered = useMemo(() => {
    return suppliers.filter((s) => {
      if (query && !s.name.toLowerCase().includes(query.toLowerCase()) && !s.category.toLowerCase().includes(query.toLowerCase())) return false
      if (category !== 'All' && s.category !== category) return false
      if (location !== 'All' && s.location !== location) return false
      if (status !== 'All' && s.status !== status) return false
      if (capability !== 'All' && !s.capabilities.includes(capability)) return false
      if (cert !== 'All' && !s.certifications.includes(cert)) return false
      return true
    })
  }, [suppliers, query, category, location, status, capability, cert])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Supplier Discovery</h1>
        <p className="text-slate-500 text-sm">Discover and evaluate MSME and startup suppliers (fictional demo data).</p>
      </div>

      <div className="card p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent outline-none text-sm w-full" placeholder="Search suppliers by name or category..." />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input text-sm">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="input text-sm">
            {locations.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="input text-sm">
            {statuses.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={capability} onChange={(e) => setCapability(e.target.value)} className="input text-sm">
            {capabilities.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={cert} onChange={(e) => setCert(e.target.value)} className="input text-sm">
            {certs.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="text-sm text-slate-500">{filtered.length} suppliers found</div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((s) => (
          <div key={s.id} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-navy-700 text-white flex items-center justify-center font-semibold">{s.initials}</div>
                <div>
                  <div className="font-semibold text-navy-900">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.type} · {s.category}</div>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadgeColor(s.status)}`}>{s.status}</span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2"><MapPin size={14} /> {s.location}</div>
              <div className="flex items-center gap-2"><Award size={14} /> {s.certifications.join(', ')}</div>
              <div className="flex items-center gap-2"><Star size={14} /> {s.rating} · Score {s.score}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {s.capabilities.slice(0, 3).map((c) => (
                <span key={c} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{c}</span>
              ))}
            </div>
            <Link to={`/suppliers/${s.id}`} className="btn-secondary mt-4 w-full justify-center text-sm">View Profile</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
