import React, { useState } from 'react'
import { useApp } from '../App'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { CheckCircle2, XCircle, FileText, Activity, Users } from 'lucide-react'
import { statusBadgeColor } from '../utils/formatters'

const checklist = [
  'Company registration valid',
  'MSME certificate verified',
  'GST & PAN verified',
  'Capability documents reviewed',
  'Quality certifications valid',
  'Compliance docs complete',
]

export default function Admin() {
  const { state, updateApplicationStatus, resetDemoData } = useApp()
  const suppliers = state.suppliers
  const [selected, setSelected] = useState(suppliers[0]?.id)
  const [checks, setChecks] = useState({})
  const [log, setLog] = useState([
    { id: 1, text: 'Admin reviewed AeroForge Precision (demo)', time: '1h ago' },
    { id: 2, text: 'Status updated for Trinetra Optics (demo)', time: '3h ago' },
  ])

  const sup = suppliers.find((s) => s.id === selected)

  const toggleCheck = (i) => setChecks((c) => ({ ...c, [i]: !c[i] }))

  const act = (status, label) => {
    updateApplicationStatus(selected, status)
    setLog((l) => [{ id: Date.now(), text: `${label}: ${sup?.name}`, time: 'just now' }, ...l])
  }

  const analyticsData = [
    { name: 'Qualified', value: suppliers.filter((s) => s.status === 'Qualified').length },
    { name: 'Under Review', value: suppliers.filter((s) => s.status === 'Under Review').length },
    { name: 'Submitted', value: suppliers.filter((s) => s.status === 'Submitted').length },
    { name: 'Rejected', value: suppliers.filter((s) => s.status === 'Rejected').length },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Admin Panel</h1>
        <p className="text-slate-500 text-sm">Review applications, verify documents, manage supplier status. Demo data only; not an official verification system. Persistence: browser LocalStorage.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-4 lg:col-span-1">
          <h3 className="font-semibold text-navy-900 mb-3 flex items-center gap-2"><Users size={16} /> Supplier Applications</h3>
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {suppliers.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => { setSelected(s.id); setChecks({}) }}
                  className={`w-full text-left p-3 rounded-lg border ${selected === s.id ? 'border-navy-700 bg-navy-50' : 'border-slate-200 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{s.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusBadgeColor(s.status)}`}>{s.status}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{s.type} · {s.category}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5 lg:col-span-2 space-y-5">
          {sup ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-navy-900 text-lg">{sup.name}</h3>
                  <p className="text-sm text-slate-500">{sup.type} · {sup.category} · {sup.location}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${statusBadgeColor(sup.status)}`}>{sup.status}</span>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-3">Demo Document Checklist (not government verification)</h4>
                <ul className="space-y-2">
                  {checklist.map((c, i) => (
                    <li key={c} className="flex items-center gap-2">
                      <input type="checkbox" checked={!!checks[i]} onChange={() => toggleCheck(i)} />
                      <span className="text-sm">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => act('Qualified', 'Approved')} className="btn-primary bg-emerald-600 hover:bg-emerald-700"><CheckCircle2 size={16} /> Approve</button>
                <button onClick={() => act('Rejected', 'Rejected')} className="btn-secondary text-red-600 border-red-200 hover:bg-red-50"><XCircle size={16} /> Reject</button>
                <button onClick={() => act('Documents Required', 'Requested documents')} className="btn-secondary"><FileText size={16} /> Request Documents</button>
                <button onClick={resetDemoData} className="btn-secondary">Reset Demo Data</button>
              </div>
            </>
          ) : (
            <p className="text-slate-500">Select a supplier.</p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2"><Activity size={16} /> Activity Logs</h3>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {log.map((l) => (
              <li key={l.id} className="flex items-center justify-between text-sm py-2 border-b border-slate-100">
                <span>{l.text}</span>
                <span className="text-xs text-slate-400">{l.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-4">Analytics</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analyticsData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#1e3f7a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
