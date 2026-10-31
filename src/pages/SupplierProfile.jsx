import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApp } from '../App'
import { MapPin, Award, Star, Users, Calendar, Mail, ArrowLeft } from 'lucide-react'
import { statusBadgeColor } from '../utils/formatters'

export default function SupplierProfile() {
  const { id } = useParams()
  const { state } = useApp()
  const supplier = state.suppliers.find((s) => s.id === id)
  if (!supplier) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-600">Supplier not found.</p>
        <Link to="/suppliers" className="btn-primary mt-4 inline-flex">Back to Discovery</Link>
      </div>
    )
  }
  const supComponents = state.components.filter((c) => c.supplierId === id)
  const supOrders = state.orders.filter((o) => o.supplierId === id)

  return (
    <div className="space-y-6">
      <Link to="/suppliers" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-navy-700"><ArrowLeft size={16} /> Back</Link>
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 rounded-xl bg-navy-700 text-white flex items-center justify-center text-2xl font-bold">{supplier.initials}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-navy-900">{supplier.name}</h1>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadgeColor(supplier.status)}`}>{supplier.status}</span>
            </div>
            <p className="text-slate-600 mt-1">{supplier.type} · {supplier.category}</p>
            <p className="text-sm text-slate-500 mt-3">{supplier.description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-navy-900">{supplier.score}</div>
            <div className="text-xs text-slate-500">Performance Score</div>
            <div className="flex items-center gap-1 justify-end mt-1"><Star size={14} className="text-amber-500" /> {supplier.rating}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200">
          <div><div className="text-xs text-slate-500">Location</div><div className="text-sm font-medium flex items-center gap-1 mt-1"><MapPin size={14} /> {supplier.location}</div></div>
          <div><div className="text-xs text-slate-500">Employees</div><div className="text-sm font-medium flex items-center gap-1 mt-1"><Users size={14} /> {supplier.employees}</div></div>
          <div><div className="text-xs text-slate-500">Established</div><div className="text-sm font-medium flex items-center gap-1 mt-1"><Calendar size={14} /> {supplier.established}</div></div>
          <div><div className="text-xs text-slate-500">Contact</div><div className="text-sm font-medium flex items-center gap-1 mt-1"><Mail size={14} /> {supplier.contact}</div></div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-4">Manufacturing Capabilities</h3>
          <div className="flex flex-wrap gap-2">
            {supplier.capabilities.map((c) => <span key={c} className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm">{c}</span>)}
          </div>
          <h3 className="font-semibold text-navy-900 mt-6 mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {supplier.certifications.map((c) => <span key={c} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm flex items-center gap-1"><Award size={12} /> {c}</span>)}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-4">Components Supplied</h3>
          {supComponents.length === 0 ? <p className="text-sm text-slate-500">No components tracked.</p> : (
            <ul className="divide-y divide-slate-100">
              {supComponents.map((c) => (
                <li key={c.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.id} · Batch {c.batch}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${statusBadgeColor(c.stage === 'Delivered' ? 'Delivered' : 'In Production')}`}>{c.stage}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-navy-900 mb-4">Purchase Orders</h3>
        {supOrders.length === 0 ? <p className="text-sm text-slate-500">No orders.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="py-2">PO ID</th>
                  <th className="py-2">Component</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Progress</th>
                  <th className="py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {supOrders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100">
                    <td className="py-2 font-medium">{o.id}</td>
                    <td className="py-2">{o.component}</td>
                    <td className="py-2">{o.qty}</td>
                    <td className="py-2"><span className={`px-2 py-0.5 rounded-full text-xs ${statusBadgeColor(o.status)}`}>{o.status}</span></td>
                    <td className="py-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div className="bg-navy-700 h-2 rounded-full" style={{ width: o.progress + '%' }} />
                      </div>
                    </td>
                    <td className="py-2">₹{o.value.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

