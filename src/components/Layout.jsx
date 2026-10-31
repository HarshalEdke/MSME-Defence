import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Menu, X, Bell, Search, ChevronDown } from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { to: '/suppliers', label: 'Supplier Discovery', icon: 'Search' },
  { to: '/qualification', label: 'Qualification', icon: 'ClipboardCheck' },
  { to: '/traceability', label: 'Traceability', icon: 'ScanLine' },
  { to: '/supply-chain', label: 'Supply Chain', icon: 'Network' },
  { to: '/admin', label: 'Admin Panel', icon: 'ShieldCheck' },
]

import * as Icons from 'lucide-react'

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-navy-900 text-white">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-navy-800">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-navy-900">N</div>
          <div>
            <div className="font-semibold leading-tight">Defence SupplyChain</div>
            <div className="text-[10px] text-navy-300">Nexus Platform</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = Icons[item.icon]
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-navy-700 text-white' : 'text-navy-200 hover:bg-navy-800 hover:text-white'
                  }`
                }
              >
                {Icon && <Icon size={18} />}
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="px-4 py-4 border-t border-navy-800 text-xs text-navy-300">
          Demo prototype · Synthetic data · LocalStorage persistence
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-navy-900 text-white flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b border-navy-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-navy-900">N</div>
                <span className="font-semibold">SupplyChain Nexus</span>
              </div>
              <button onClick={() => setOpen(false)}><X size={20} /></button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = Icons[item.icon]
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? 'bg-navy-700 text-white' : 'text-navy-200 hover:bg-navy-800 hover:text-white'
                      }`
                    }
                  >
                    {Icon && <Icon size={18} />}
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-80">
              <Search size={16} className="text-slate-400" />
              <input className="bg-transparent outline-none text-sm w-full" placeholder="Search suppliers, components..." />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-slate-100">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-navy-700 text-white flex items-center justify-center text-sm font-semibold">PM</div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">Procurement Mgr</div>
                <div className="text-xs text-slate-500">Defence Org</div>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
