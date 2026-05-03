import { useState } from 'react'
import { Badge } from '../ui/Badge'
import type { Lead } from '../../types'
import { Phone, Mail, User, MessageSquare, Calendar, ChevronDown, CheckCircle2, Clock, XCircle } from 'lucide-react'

export function LeadsTable({ initialData }: { initialData: Lead[] }) {
  const [data, setData] = useState(initialData)
  const [saving, setSaving] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  async function updateStatus(id: string, status: string, originalStatus: string) {
    setSaving(id)
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setData((prev) => prev.map((l) => (l.id === id ? { ...l, status: status as Lead['status'] } : l)))
      } else {
        const select = document.getElementById(`status-${id}`) as HTMLSelectElement
        if (select) select.value = originalStatus
      }
    } catch (err) {
      const select = document.getElementById(`status-${id}`) as HTMLSelectElement
      if (select) select.value = originalStatus
    } finally {
      setSaving(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="h-4 w-4 text-blue-500" />
      case 'contacted': return <Clock className="h-4 w-4 text-orange-500" />
      case 'closed': return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default: return null
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-4 font-semibold text-gray-900">Lead / Contacto</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Origen</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Estado</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                  No hay leads registrados aún.
                </td>
              </tr>
            ) : (
              data.map((lead) => (
                <React.Fragment key={lead.id}>
                  <tr className={`group transition-colors hover:bg-gray-50/50 ${expanded === lead.id ? 'bg-gray-50/50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 font-medium text-gray-900">
                          <User className="h-3.5 w-3.5 text-gray-400" />
                          {lead.name}
                        </div>
                        <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <Badge variant="outline" className="w-fit px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold">
                          {lead.source}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <Calendar className="h-3 w-3" />
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '—'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-flex items-center gap-2">
                        {getStatusIcon(lead.status)}
                        <select
                          id={`status-${lead.id}`}
                          defaultValue={lead.status}
                          disabled={saving === lead.id}
                          onChange={(e) => updateStatus(lead.id, e.target.value, lead.status)}
                          className="appearance-none bg-transparent pr-8 text-sm font-medium text-gray-700 focus:outline-none disabled:opacity-50 cursor-pointer hover:text-brand-600"
                        >
                          <option value="new">Nuevo</option>
                          <option value="contacted">Contactado</option>
                          <option value="closed">Cerrado</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-gray-400" />
                        {saving === lead.id && (
                          <div className="absolute -bottom-4 left-0 text-[10px] text-brand-600 animate-pulse">
                            Guardando...
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                          expanded === lead.id
                            ? 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200'
                            : 'bg-white text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        {expanded === lead.id ? 'Ocultar' : 'Ver Mensaje'}
                      </button>
                    </td>
                  </tr>
                  {expanded === lead.id && (
                    <tr className="bg-brand-50/20">
                      <td colSpan={4} className="px-6 py-6">
                        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-brand-100">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-600">Mensaje del cliente</p>
                          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                            {lead.message || <span className="italic text-gray-400">Sin mensaje adjunto.</span>}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import React from 'react'
