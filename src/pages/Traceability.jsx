import React, { useState } from 'react'
import { useApp } from '../App'
import { Search, QrCode, CheckCircle2, Circle } from 'lucide-react'
import { formatDate } from '../utils/formatters'

const stages = ['Supplier Registration', 'Manufacturing', 'Quality Inspection', 'Dispatch', 'Receipt']

function stageIndex(stage) {
  if (stage === 'Delivered' || stage === 'Receipt') return 4
  if (stage === 'Dispatched') return 3
  if (stage === 'Quality Inspection') return 2
  if (stage === 'In Production' || stage === 'Manufacturing') return 1
  return 0
}

export default function Traceability() {
  const { state } = useApp()
  const components = state.components
  const [query, setQuery] = useState('')
  const [found, setFound] = useState(null)
  const [error, setError] = useState('')

  const search = (e) => {
    e?.preventDefault()
    const c = components.find((x) => x.id.toLowerCase() === query.trim().toLowerCase())
    if (c) {
      setFound(c)
      setError('')
    } else {
      setFound(null)
      setError('Component not found. Try COMP-AF-1042.')
    }
  }

  const idx = found ? stageIndex(found.stage) : -1

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Component Traceability</h1>
        <p className="text-slate-500 text-sm">Search a component by unique ID to view its full lifecycle (demo data only).</p>
      </div>

      <form onSubmit={search} className="card p-4 flex gap-3">
        <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent outline-none text-sm w-full" placeholder="Enter Component ID (e.g. COMP-AF-1042)" />
        </div>
        <button type="submit" className="btn-primary">Search</button>
      </form>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {found && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card p-6 lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-navy-900">Component Details</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><div className="text-slate-500">Component ID</div><div className="font-medium">{found.id}</div></div>
              <div><div className="text-slate-500">Component Name</div><div className="font-medium">{found.name}</div></div>
              <div><div className="text-slate-500">Supplier</div><div className="font-medium">{found.supplierName}</div></div>
              <div><div className="text-slate-500">Batch Number</div><div className="font-medium">{found.batch}</div></div>
              <div><div className="text-slate-500">Manufacturing Date</div><div className="font-medium">{formatDate(found.manufacturingDate)}</div></div>
              <div><div className="text-slate-500">Inspection Status</div><div className="font-medium">{found.inspectionStatus}</div></div>
              <div><div className="text-slate-500">Quality Documentation</div><div className="font-medium">{found.qualityDocStatus}</div></div>
              <div><div className="text-slate-500">Current Stage</div><div className="font-medium">{found.stage}</div></div>
            </div>

            <h3 className="font-semibold text-navy-900 mt-6">Traceability Timeline</h3>
            <div className="flex items-center gap-2 overflow-x-auto py-4">
              {stages.map((s, i) => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center min-w-[90px]">
                    {i <= idx ? <CheckCircle2 size={22} className="text-emerald-500" /> : <Circle size={22} className="text-slate-300" />}
                    <span className={`text-xs mt-2 text-center ${i <= idx ? 'text-navy-900 font-medium' : 'text-slate-400'}`}>{s}</span>
                  </div>
                  {i < stages.length - 1 && <div className={`flex-1 h-1 min-w-[20px] rounded ${i < idx ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="card p-6 flex flex-col items-center justify-center">
            <div className="w-32 h-32 grid grid-cols-8 gap-0.5 bg-white p-2 border border-slate-200 rounded-lg">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={`rounded-sm ${Math.sin(i * 9301 + 49297) > 0 ? 'bg-navy-900' : 'bg-slate-200'}`} />
              ))}
            </div>
            <div className="mt-3 text-sm font-medium">{found.qr}</div>
            <div className="text-xs text-slate-500 mt-1">QR-style placeholder (not a scannable code; demo only)</div>
            <QrCode size={18} className="text-slate-400 mt-2" />
          </div>
        </div>
      )}
    </div>
  )
}
