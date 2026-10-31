import React, { useState } from 'react'
import { useApp } from '../App'
import { suppliers } from '../data/suppliers'
import { statusBadgeColor } from '../utils/formatters'
import { Network, AlertTriangle, Package } from 'lucide-react'

const manufacturers = [
  { id: 'MFG-1', name: 'Defence Prime A', x: 50, y: 30 },
  { id: 'MFG-2', name: 'Defence Prime B', x: 50, y: 70 },
]

const supNodes = suppliers.slice(0, 6).map((s, i) => ({
  id: s.id,
  name: s.name.split(' ')[0],
  x: 15 + (i % 3) * 25,
  y: 20 + Math.floor(i / 3) * 60,
}))

export default function SupplyChain() {
  const { state } = useApp()
  const orders = state.orders
  const [selected, setSelected] = useState(null)
  const delayed = orders.filter((o) => o.status === 'Delayed')
  const inventory = [
    { item: 'Aircraft Bracket Assembly', stock: 42, reorder: 30 },
    { item: 'RF Transceiver Module', stock: 18, reorder: 20 },
    { item: 'Forged Axle Shaft', stock: 65, reorder: 50 },
    { item: 'Rugged Battery Pack 24V', stock: 24, reorder: 15 },
  ]

  const edges = supNodes.map((s, i) => ({
    from: s.id,
    to: manufacturers[i % 2].id,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Supply-Chain Integration</h1>
        <p className="text-slate-500 text-sm">Visibility across supplier-manufacturer relationships, orders and risks (demo data).</p>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2"><Network size={16} /> Supply-Chain Network</h3>
        <div className="relative w-full h-72 bg-slate-50 rounded-lg overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {edges.map((e, i) => {
              const from = supNodes.find((n) => n.id === e.from)
              const to = manufacturers.find((n) => n.id === e.to)
              return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#94a3b8" strokeWidth="0.5" />
            })}
            {supNodes.map((n) => (
              <g key={n.id} onClick={() => setSelected(n.id)} className="cursor-pointer">
                <circle cx={n.x} cy={n.y} r="3.5" fill="#1e3f7a" />
                <text x={n.x} y={n.y + 6} fontSize="2.5" textAnchor="middle" fill="#0f1f42">{n.name}</text>
              </g>
            ))}
            {manufacturers.map((n) => (
              <g key={n.id}>
                <rect x={n.x - 4} y={n.y - 3} width="8" height="6" fill="#06b6d4" rx="1" />
                <text x={n.x} y={n.y + 6} fontSize="2.5" textAnchor="middle" fill="#0f1f42">{n.name}</text>
              </g>
            ))}
          </svg>
        </div>
        <p className="text-xs text-slate-500 mt-2">Click a supplier node to view details. Blue = manufacturer, Navy = supplier.</p>
        {selected && (
          <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm">
            Selected supplier: <b>{suppliers.find((s) => s.id === selected)?.name}</b> — {suppliers.find((s) => s.id === selected)?.category}
          </div>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-4">Purchase Order Status</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="py-2">PO</th>
                  <th className="py-2">Supplier</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Progress</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100">
                    <td className="py-2 font-medium">{o.id}</td>
                    <td className="py-2">{o.supplierName}</td>
                    <td className="py-2"><span className={`px-2 py-0.5 rounded-full text-xs ${statusBadgeColor(o.status)}`}>{o.status}</span></td>
                    <td className="py-2">
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div className="bg-navy-700 h-2 rounded-full" style={{ width: o.progress + '%' }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2"><AlertTriangle size={16} /> Delayed Shipments</h3>
          {delayed.length === 0 ? <p className="text-sm text-slate-500">No delays.</p> : (
            <ul className="space-y-3">
              {delayed.map((o) => (
                <li key={o.id} className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{o.id} · {o.component}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusBadgeColor('Delayed')}`}>Delayed</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">{o.supplierName} · Due {o.dueDate} · Progress {o.progress}%</div>
                </li>
              ))}
            </ul>
          )}

          <h3 className="font-semibold text-navy-900 mt-6 mb-4 flex items-center gap-2"><Package size={16} /> Inventory Visibility</h3>
          <ul className="space-y-2">
            {inventory.map((i) => (
              <li key={i.item} className="flex items-center justify-between text-sm">
                <span>{i.item}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${i.stock < i.reorder ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {i.stock} in stock
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-navy-900 mb-4">Supplier Dependency & Risk Alerts</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Single-source risk', desc: 'Thermal Imaging Module has only one qualified supplier.', level: 'warning' },
            { title: 'Capacity constraint', desc: 'Indus Forging at 92% capacity utilization.', level: 'info' },
            { title: 'Qualification gap', desc: '2 suppliers still under document review.', level: 'error' },
          ].map((r) => (
            <div key={r.title} className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${r.level === 'error' ? 'bg-red-500' : r.level === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <span className="font-medium text-sm">{r.title}</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

