import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Search, GitBranch, BarChart3, Users, Package, CheckCircle2 } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-navy-700 text-white flex items-center justify-center font-bold">N</div>
            <span className="font-semibold text-navy-900">Defence SupplyChain Nexus</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/suppliers" className="text-sm text-slate-600 hover:text-navy-700">Explore Suppliers</Link>
            <Link to="/dashboard" className="btn-primary text-sm">Get Started</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs mb-6">
              <ShieldCheck size={14} /> Trusted Supplier Ecosystem
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Building a Trusted, Traceable and Integrated Defence Supply Chain.
            </h1>
            <p className="mt-6 text-lg text-navy-100">
              Defence SupplyChain Nexus connects defence manufacturers with qualified MSMEs and startups,
              digitising supplier qualification, component traceability, and supply-chain visibility in one platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/dashboard" className="btn-primary bg-white text-navy-900 hover:bg-navy-100">Get Started <ArrowRight size={16} /></Link>
              <Link to="/suppliers" className="btn-secondary border-white/30 text-white hover:bg-white/10">Explore Suppliers</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Registered Suppliers', value: '14+' },
              { label: 'Qualified', value: '6' },
              { label: 'Components Tracked', value: '8' },
              { label: 'Purchase Orders', value: '10' },
            ].map((s) => (
              <div key={s.label} className="card bg-white/10 border-white/20 p-6 backdrop-blur">
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-navy-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-navy-900 text-center">Why Defence SupplyChain Nexus</h2>
        <p className="text-slate-600 text-center mt-3 max-w-2xl mx-auto">A unified digital layer for supplier discovery, qualification, traceability and coordination.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Search, title: 'Supplier Discovery', desc: 'Find qualified MSMEs and startups by capability, location and certification.' },
            { icon: ShieldCheck, title: 'Digital Qualification', desc: 'Multi-step onboarding with document verification and approval workflows.' },
            { icon: GitBranch, title: 'Component Traceability', desc: 'Track every component from registration to receipt with timeline visibility.' },
            { icon: Users, title: 'Supply-Chain Integration', desc: 'Monitor supplier-manufacturer relationships, orders and delivery progress.' },
            { icon: BarChart3, title: 'Analytics & Insights', desc: 'Dashboards for qualification trends, distribution and risk alerts.' },
            { icon: Package, title: 'Reduced Onboarding Time', desc: 'Cut manual documentation and verification delays with digital workflows.' },
          ].map((b) => (
            <div key={b.title} className="card p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center mb-4">
                <b.icon size={20} />
              </div>
              <h3 className="font-semibold text-navy-900">{b.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-navy-900 text-center">Supplier Qualification Workflow</h2>
          <div className="grid md:grid-cols-6 gap-4 mt-12">
            {['Company Registration', 'Business Credentials', 'Manufacturing Capability', 'Quality Certifications', 'Compliance Docs', 'Review & Submission'].map((s, i) => (
              <div key={s} className="card p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-navy-700 text-white mx-auto flex items-center justify-center text-sm font-bold">{i + 1}</div>
                <div className="text-sm font-medium mt-3">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">End-to-End Component Traceability</h2>
            <p className="text-slate-600 mt-4">
              Search any component by its unique ID and view its full lifecycle: supplier registration, manufacturing,
              quality inspection, dispatch and receipt. QR-style identification keeps records consistent across the chain.
            </p>
            <Link to="/traceability" className="btn-primary mt-6">Try Traceability</Link>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                <div className="w-8 h-8 grid grid-cols-4 gap-0.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className={`rounded-sm ${i % 3 === 0 ? 'bg-navy-900' : 'bg-slate-300'}`} />
                  ))}
                </div>
              </div>
              <div>
                <div className="font-medium">COMP-AF-1042</div>
                <div className="text-xs text-slate-500">Aircraft Bracket Assembly</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {['Supplier Registration', 'Manufacturing', 'Quality Inspection', 'Dispatch', 'Receipt'].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className={i < 4 ? 'text-emerald-500' : 'text-slate-300'} />
                  <span className={i < 4 ? 'text-slate-700' : 'text-slate-400'}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {[
            { value: '14', label: 'Registered Suppliers (demo)' },
            { value: '6', label: 'Qualified Suppliers (demo)' },
            { value: '63%', label: 'Traceability Coverage (demo)' },
            { value: '10', label: 'Active Purchase Orders (demo)' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold">{s.value}</div>
              <div className="text-navy-200 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-6 text-center text-xs text-navy-300">Synthetic demonstration data only. No real defence or supplier information.</div>
      </section>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-semibold text-white">Defence SupplyChain Nexus</div>
            <p className="text-sm mt-2">Hackathon demonstration platform. Fictional data only.</p>
          </div>
          {[
            { title: 'Platform', links: ['Dashboard', 'Supplier Discovery', 'Qualification'] },
            { title: 'Modules', links: ['Traceability', 'Supply Chain', 'Admin'] },
            { title: 'Info', links: ['About', 'Contact', 'Privacy'] },
          ].map((c) => (
            <div key={c.title}>
              <div className="font-medium text-white mb-3">{c.title}</div>
              <ul className="space-y-2 text-sm">
                {c.links.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-slate-700 text-xs text-slate-500">
          © 2024 Defence SupplyChain Nexus. Demo prototype only.
        </div>
      </footer>
    </div>
  )
}

