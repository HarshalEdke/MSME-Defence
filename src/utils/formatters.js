export function formatCurrency(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

export function formatDate(s) {
  if (!s) return '-'
  const d = new Date(s)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function statusBadgeColor(status) {
  const map = {
    'Draft': 'bg-slate-100 text-slate-700',
    'Submitted': 'bg-blue-100 text-blue-700',
    'Under Review': 'bg-amber-100 text-amber-700',
    'Documents Required': 'bg-orange-100 text-orange-700',
    'Qualified': 'bg-emerald-100 text-emerald-700',
    'Rejected': 'bg-red-100 text-red-700',
    'Planned': 'bg-slate-100 text-slate-700',
    'In Production': 'bg-blue-100 text-blue-700',
    'Quality Inspection': 'bg-amber-100 text-amber-700',
    'Dispatched': 'bg-cyan-100 text-cyan-700',
    'Delivered': 'bg-emerald-100 text-emerald-700',
    'Delayed': 'bg-red-100 text-red-700',
  }
  return map[status] || 'bg-slate-100 text-slate-700'
}
