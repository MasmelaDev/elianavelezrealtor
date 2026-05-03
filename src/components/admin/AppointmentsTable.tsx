import { Badge } from '../ui/Badge'
import type { AppointmentWithDetails } from '../../types'
import { User, Mail, Phone, Calendar, Clock, ChevronDown, CheckCircle2, Clock as ClockIcon, XCircle } from 'lucide-react'
import { useState } from 'react'

export function AppointmentsTable({ data: initialData }: { data: AppointmentWithDetails[] }) {
  const [data, setData] = useState(initialData)
  const [saving, setSaving] = useState<string | null>(null)

  async function updateStatus(id: string, status: string, originalStatus: string) {
    setSaving(id)
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setData((prev) => prev.map((a) => (a.id === id ? { ...a, status: status as any } : a)))
      } else {
        const select = document.getElementById(`status-appt-${id}`) as HTMLSelectElement
        if (select) select.value = originalStatus
      }
    } catch (err) {
      const select = document.getElementById(`status-appt-${id}`) as HTMLSelectElement
      if (select) select.value = originalStatus
    } finally {
      setSaving(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />
      case 'pending': return <ClockIcon className="h-4 w-4 text-amber-500" />
      default: return null
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-4 font-semibold text-gray-900">Cliente</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Fecha y Hora</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Estado</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Agendado el</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                  No hay citas agendadas aún.
                </td>
              </tr>
            ) : (
              data.map((appt) => {
                const dateObj = new Date(appt.slotDate)
                const dateStr = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString() : String(appt.slotDate)
                const timeStart = typeof appt.slotTimeStart === 'string' ? appt.slotTimeStart.slice(0, 5) : '—'
                
                return (
                  <tr key={appt.id} className="group transition-colors hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 font-medium text-gray-900">
                          <User className="h-3.5 w-3.5 text-gray-400" />
                          {appt.leadName}
                        </div>
                        <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {appt.leadEmail}
                          </div>
                          {appt.leadPhone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {appt.leadPhone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          {dateStr}
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs text-gray-500">
                          <Clock className="h-3.5 w-3.5 text-gray-400" />
                          {timeStart}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-flex items-center gap-2">
                        {getStatusIcon(appt.status)}
                        <select
                          id={`status-appt-${appt.id}`}
                          defaultValue={appt.status}
                          disabled={saving === appt.id}
                          onChange={(e) => updateStatus(appt.id, e.target.value, appt.status)}
                          className="appearance-none bg-transparent pr-8 text-sm font-medium text-gray-700 focus:outline-none disabled:opacity-50 cursor-pointer hover:text-brand-600"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmada</option>
                          <option value="cancelled">Cancelada</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-gray-400" />
                        {saving === appt.id && (
                          <div className="absolute -bottom-4 left-0 text-[10px] text-brand-600 animate-pulse">
                            Guardando...
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {appt.createdAt ? new Date(appt.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
