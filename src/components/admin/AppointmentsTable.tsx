import { DataTable } from './DataTable'
import { Badge } from '../ui/Badge'
import type { AppointmentWithDetails } from '../../types'

export function AppointmentsTable({ data }: { data: AppointmentWithDetails[] }) {
  return (
    <DataTable
      data={data}
      keyExtractor={(a) => a.id}
      columns={[
        { header: 'Cliente', accessor: 'leadName' },
        { 
          header: 'Email / Tel', 
          accessor: (a) => <div className="flex flex-col"><span className="font-medium text-gray-900">{a.leadEmail}</span><span className="text-gray-500">{a.leadPhone ?? '—'}</span></div> 
        },
        {
          header: 'Fecha / Hora',
          accessor: (a) => {
            const dateObj = new Date(a.slotDate)
            const dateStr = !isNaN(dateObj.getTime()) ? dateObj.toISOString().slice(0, 10) : String(a.slotDate)
            const timeStart = typeof a.slotTimeStart === 'string' ? a.slotTimeStart.slice(0, 5) : '—'
            return <span className="font-mono">{dateStr} {timeStart}</span>
          }
        },
        {
          header: 'Estado',
          accessor: (a) => (
            <Badge variant={a.status === 'confirmed' ? 'success' : a.status === 'cancelled' ? 'error' : 'warning'}>
              {a.status}
            </Badge>
          ),
        },
      ]}
      emptyMessage="No hay citas registradas."
    />
  )
}
