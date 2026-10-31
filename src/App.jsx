import React, { createContext, useContext, useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { suppliers as seedSuppliers } from './data/suppliers'
import { components as seedComponents } from './data/components'
import { orders as seedOrders } from './data/orders'
import { activities as seedActivities } from './data/activities'
import { loadState, saveState } from './utils/storage'

import Layout from './components/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import SupplierDiscovery from './pages/SupplierDiscovery'
import SupplierProfile from './pages/SupplierProfile'
import SupplierQualification from './pages/SupplierQualification'
import Traceability from './pages/Traceability'
import SupplyChain from './pages/SupplyChain'
import Admin from './pages/Admin'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

export default function App() {
  const [state, setState] = useState(() => {
    const saved = loadState()
    return {
      suppliers: saved?.suppliers || seedSuppliers,
      components: saved?.components || seedComponents,
      orders: saved?.orders || seedOrders,
      activities: saved?.activities || seedActivities,
      applications: saved?.applications || [],
    }
  })

  useEffect(() => {
    saveState(state)
  }, [state])

  const updateSupplierStatus = (id, status) => {
    setState((s) => ({
      ...s,
      suppliers: s.suppliers.map((sup) => (sup.id === id ? { ...sup, status } : sup)),
    }))
  }

  const addApplication = (app) => {
    setState((s) => ({
      ...s,
      applications: [app, ...s.applications],
      suppliers: s.suppliers.some((x) => x.id === app.id)
        ? s.suppliers
        : [{ ...app, status: 'Submitted' }, ...s.suppliers],
    }))
  }

  const updateApplicationStatus = (id, status) => {
    setState((s) => ({
      ...s,
      applications: s.applications.map((a) => (a.id === id ? { ...a, status } : a)),
      suppliers: s.suppliers.map((sup) => (sup.id === id ? { ...sup, status } : sup)),
    }))
  }

  const updateOrderStatus = (id, status, progress) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === id ? { ...o, status, progress: progress ?? o.progress } : o)),
    }))
  }

  const resetDemoData = () => {
    if (!window.confirm('Reset all demo data to the original sample records? This cannot be undone.')) return
    const fresh = {
      suppliers: seedSuppliers,
      components: seedComponents,
      orders: seedOrders,
      activities: seedActivities,
      applications: [],
    }
    setState(fresh)
    saveState(fresh)
  }

  const value = { state, setState, updateSupplierStatus, addApplication, updateApplicationStatus, updateOrderStatus, resetDemoData }

  return (
    <AppContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/suppliers" element={<SupplierDiscovery />} />
          <Route path="/suppliers/:id" element={<SupplierProfile />} />
          <Route path="/qualification" element={<SupplierQualification />} />
          <Route path="/traceability" element={<Traceability />} />
          <Route path="/supply-chain" element={<SupplyChain />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContext.Provider>
  )
}
