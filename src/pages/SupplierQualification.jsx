import React, { useState } from 'react'
import { useApp } from '../App'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react'

const steps = [
  'Company Registration',
  'Business & MSME Credentials',
  'Manufacturing Capabilities',
  'Quality Certifications',
  'Compliance Documentation',
  'Review & Submission',
]

export default function SupplierQualification() {
  const { addApplication } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    type: 'MSME',
    msmeNumber: '',
    gst: '',
    pan: '',
    address: '',
    capabilities: '',
    equipment: '',
    capacity: '',
    certifications: '',
    qualitySystem: '',
    docs: '',
    declaration: false,
  })

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const validateStep = () => {
    const e = {}
    if (step === 0) {
      if (!form.companyName) e.companyName = 'Required'
      if (!form.contactPerson) e.contactPerson = 'Required'
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
      if (!form.phone) e.phone = 'Required'
    }
    if (step === 1) {
      if (!form.msmeNumber) e.msmeNumber = 'Required'
      if (!form.gst) e.gst = 'Required'
      if (!form.pan) e.pan = 'Required'
      if (!form.address) e.address = 'Required'
    }
    if (step === 2) {
      if (!form.capabilities) e.capabilities = 'Required'
    }
    if (step === 3) {
      if (!form.certifications) e.certifications = 'Required'
    }
    if (step === 4) {
      if (!form.docs) e.docs = 'Required'
    }
    if (step === 5) {
      if (!form.declaration) e.declaration = 'Please accept declaration'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1))
  }
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const submit = () => {
    if (!validateStep()) return
    const id = 'SUP-' + String(Math.floor(Math.random() * 9000) + 1000)
    const initials = form.companyName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    const app = {
      id,
      name: form.companyName,
      initials,
      type: form.type,
      category: form.capabilities.split(',')[0]?.trim() || 'General',
      capabilities: form.capabilities.split(',').map((c) => c.trim()).filter(Boolean),
      location: form.address.split(',').pop()?.trim() || 'India',
      certifications: form.certifications.split(',').map((c) => c.trim()).filter(Boolean),
      status: 'Submitted',
      rating: 4.0,
      score: 70,
      description: form.qualitySystem || 'Newly submitted supplier application.',
      employees: 0,
      established: new Date().getFullYear(),
      contact: form.email,
    }
    addApplication(app)
    setSubmitted(true)
  }
  if (submitted) {
    return (
      <div className="card p-10 text-center max-w-xl mx-auto">
        <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
        <h2 className="text-2xl font-bold text-navy-900 mt-4">Application Submitted</h2>
        <p className="text-slate-600 mt-2">Your supplier qualification application has been submitted for review. Status: Submitted.</p>
        <button onClick={() => navigate('/suppliers')} className="btn-primary mt-6">View Suppliers</button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Supplier Qualification</h1>
        <p className="text-slate-500 text-sm">Multi-step onboarding and qualification workflow (demo; not official authorization).</p>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? 'bg-navy-700 text-white' : 'bg-slate-200 text-slate-500'}`}>{i + 1}</div>
              {i < steps.length - 1 && <div className={`flex-1 h-1 mx-2 rounded ${i < step ? 'bg-navy-700' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
        <div className="text-sm font-medium text-navy-900 mt-2">{steps[step]}</div>
      </div>

      <div className="card p-6 space-y-4">
        {step === 0 && (
          <>
            <Field label="Company Name" value={form.companyName} onChange={(v) => update('companyName', v)} error={errors.companyName} />
            <Field label="Contact Person" value={form.contactPerson} onChange={(v) => update('contactPerson', v)} error={errors.contactPerson} />
            <Field label="Email" value={form.email} onChange={(v) => update('email', v)} error={errors.email} />
            <Field label="Phone" value={form.phone} onChange={(v) => update('phone', v)} error={errors.phone} />
            <div>
              <label className="label" htmlFor="field-supplier-type">Supplier Type</label>
              <select id="field-supplier-type" value={form.type} onChange={(e) => update('type', e.target.value)} className="input">
                <option>MSME</option>
                <option>Startup</option>
              </select>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <Field label="MSME Registration Number" value={form.msmeNumber} onChange={(v) => update('msmeNumber', v)} error={errors.msmeNumber} />
            <Field label="GST Number" value={form.gst} onChange={(v) => update('gst', v)} error={errors.gst} />
            <Field label="PAN Number" value={form.pan} onChange={(v) => update('pan', v)} error={errors.pan} />
            <Field label="Registered Address" value={form.address} onChange={(v) => update('address', v)} error={errors.address} />
          </>
        )}
        {step === 2 && (
          <>
            <Field label="Manufacturing Capabilities (comma separated)" value={form.capabilities} onChange={(v) => update('capabilities', v)} error={errors.capabilities} />
            <Field label="Key Equipment" value={form.equipment} onChange={(v) => update('equipment', v)} />
            <Field label="Production Capacity" value={form.capacity} onChange={(v) => update('capacity', v)} />
          </>
        )}
        {step === 3 && (
          <>
            <Field label="Quality Certifications (comma separated)" value={form.certifications} onChange={(v) => update('certifications', v)} error={errors.certifications} />
            <Field label="Quality Management System" value={form.qualitySystem} onChange={(v) => update('qualitySystem', v)} />
          </>
        )}
        {step === 4 && (
          <>
            <Field label="Compliance Documents (list)" value={form.docs} onChange={(v) => update('docs', v)} error={errors.docs} />
            <p className="text-xs text-slate-500">Demo only: no real documents are uploaded or stored.</p>
          </>
        )}
        {step === 5 && (
          <>
            <div className="bg-slate-50 rounded-lg p-4 text-sm space-y-2">
              <div><b>Company:</b> {form.companyName}</div>
              <div><b>Type:</b> {form.type}</div>
              <div><b>Capabilities:</b> {form.capabilities}</div>
              <div><b>Certifications:</b> {form.certifications}</div>
              <div><b>Contact:</b> {form.email}</div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.declaration} onChange={(e) => update('declaration', e.target.checked)} />
              I declare the information provided is accurate (demo declaration).
            </label>
            {errors.declaration && <p className="text-red-500 text-xs">{errors.declaration}</p>}
          </>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={prev} disabled={step === 0} className="btn-secondary disabled:opacity-40"><ChevronLeft size={16} /> Previous</button>
        {step < steps.length - 1 ? (
          <button onClick={next} className="btn-primary">Next <ChevronRight size={16} /></button>
        ) : (
          <button onClick={submit} className="btn-primary">Submit Application</button>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, error }) {
  const id = 'field-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} className="input" />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

