import { useState } from 'react'
import { DataTable } from './DataTable'
import { Badge } from '../ui/Badge'
import type { Lead } from '../../types'

export function LeadsTable({ initialData }: { initialData: Lead[] }) {
  const [data, setData] = useState(initialData)
  const [saving, setSaving] = useState<string | null>(null)

  async function updateStatus(id: string, status: string, originalStatus: string) {
    setSaving(id)
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setSaving(null)
    
    if (res.ok) {
      setData((prev) => prev.map((l) => (l.id === id ? { ...l, status: status as Lead['status'] } : l)))
    } else {
      // Revert select visually if it failed
      const select = document.getElementById(`status-${id}`) as HTMLSelectElement
      if (select) select.value = originalStatus
    }
  }

  return (
    <DataTable
      data={data}
      keyExtractor={(l) => l.id}
      columns={[
        { header: 'Nombre', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { 
          header: 'Origen', 
          accessor: (l) => <Badge variant="outline" className="capitalize">{l.source}</Badge> 
        },
        {
          header: 'Estado',
          accessor: (l) => (
            <div className="flex flex-col gap-1">
              <select
                id={`status-${l.id}`}
                defaultValue={l.status}
                disabled={saving === l.id}
                onChange={(e) => updateStatus(l.id, e.target.value, l.status)}
                className="block rounded border border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-50"
              >
                <option value="new">Nuevo</option>
                <option value="contacted">Contactado</option>
                <option value="closed">Cerrado</option>
              </select>
              {saving === l.id && <span className="text-xs text-brand-600">Actualizando...</span>}
            </div>
          ),
        },
        {
          header: 'Fecha',
          accessor: (l) => <span className="text-gray-500">{l.createdAt ? new Date(l.createdAt).toLocaleDateString() : '—'}</span>
        },
      ]}
      emptyMessage="No hay leads registrados."
    />
  )
}
