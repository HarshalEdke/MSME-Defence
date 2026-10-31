import React from 'react'
import { useApp } from '../App'
import { activities, notifications } from '../data/activities'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts'
import { Users, CheckCircle2, Clock, FileText, Package, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react'

export default function Dashboard() {
  const { state } = useApp()
  const suppliers = state.suppliers
  const orders = state.orders
  const components = state.components
  const total = suppliers.length
  const qualified = suppliers.filter((s) => s.status === 'Qualified').length
  const underReview = suppliers.filter((s) => s.status === 'Under Review' || s.status === 'Documents Required').length
  const pending = suppliers.filter((s) => s.status === 'Submitted' || s.status === 'Draft').length
  const activeOrders = orders.filter((o) => o.status !== 'Delivered').length
  const traceCoverage = components.length ? Math.round((components.filter((c) => c.qualityDocStatus === 'Complete').length / components.length) * 100) : 0

  const trendData = [
    { month: 'Jul', qualified: 2, submitted: 5 },
    { month: 'Aug', qualified: 3, submitted: 7 },
    { month: 'Sep', qualified: 4, submitted: 9 },
    { month: 'Oct', qualified: 6, submitted: 12 },
    { month: 'Nov', qualified: 6, submitted: 14 },
  ]

  const catMap = {}
  suppliers.forEach((s) => {
    catMap[s.category] = (catMap[s.category] || 0) + 1
  })
  const distData = Object.entries(catMap).map(([name, value]) => ({ name, value }))

  const COLORS = ['#1e3f7a', '#06b6d4', '#22d3ee', '#5a7fb8', '#8da8d2', '#b3c5e1']

  const stats = [
    { label: 'Total Suppliers', value: total, icon: Users, color: 'text-navy-700' },
    { label: 'Qualified', value: qualified, icon: CheckCircle2, color: 'text-emerald-600' },
    { label: 'Under Verification', value: underReview, icon: Clock, color: 'text-amber-600' },
    { label: 'Pending Requests', value: pending, icon: FileText, color: 'text-orange-600' },
    { label: 'Active Orders', value: activeOrders, icon: Package, color: 'text-cyan-600' },
    { label: 'Traceability Coverage', value: traceCoverage + '%', icon: ShieldCheck, color: 'text-indigo-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
        <p className="text-slate-500 text-sm">Supply-chain overview and qualification metrics (demo data; counts reflect current records).</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <div className="flex items-center justify-between">
              <s.icon size={18} className={s.color} />
            </div>
            <div className="text-2xl font-bold mt-2">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2"><TrendingUp size={16} /> Qualification Trends</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="qualified" stroke="#1e3f7a" strokeWidth={2} />
              <Line type="monotone" dataKey="submitted" stroke="#06b6d4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-4">Supplier Distribution by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={distData} dataKey="value" nameKey="name" outerRadius={90} label>
                {distData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-semibold text-navy-900 mb-4">Recent Supplier Activity</h3>
          <ul className="divide-y divide-slate-100">
            {activities.map((a) => (
              <li key={a.id} className="py-3 flex items-center justify-between">
                <span className="text-sm text-slate-700">{a.text}</span>
                <span className="text-xs text-slate-400">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2"><AlertTriangle size={16} /> Alerts & Notifications</h3>
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-start gap-2">
                <span className={`mt-1 w-2 h-2 rounded-full ${n.level === 'error' ? 'bg-red-500' : n.level === 'warning' ? 'bg-amber-500' : n.level === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                <span className="text-sm text-slate-700">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-navy-900 mb-4">Supplier Qualification Status Breakdown</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={[
            { status: 'Draft', count: suppliers.filter((s) => s.status === 'Draft').length },
            { status: 'Submitted', count: suppliers.filter((s) => s.status === 'Submitted').length },
            { status: 'Under Review', count: suppliers.filter((s) => s.status === 'Under Review').length },
            { status: 'Documents Required', count: suppliers.filter((s) => s.status === 'Documents Required').length },
            { status: 'Qualified', count: suppliers.filter((s) => s.status === 'Qualified').length },
            { status: 'Rejected', count: suppliers.filter((s) => s.status === 'Rejected').length },
          ]}>
            <XAxis dataKey="status" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#1e3f7a" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

