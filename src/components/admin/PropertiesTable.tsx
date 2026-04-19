import { DataTable } from './DataTable'
import { Badge } from '../ui/Badge'
import type { Property } from '../../types'

export function PropertiesTable({ data }: { data: Property[] }) {
  return (
    <DataTable
      data={data}
      keyExtractor={(p) => p.id}
      columns={[
        { header: 'Título (ES)', accessor: 'titleEs' },
        { header: 'Zona', accessor: 'zone' },
        { header: 'Tipo', accessor: 'type' },
        { header: 'Precio', accessor: 'price' },
        {
          header: 'Estado',
          accessor: (p) => (
            <Badge variant={p.status === 'available' ? 'success' : p.status === 'sold' ? 'error' : 'warning'}>
              {p.status}
            </Badge>
          ),
        },
        {
          header: '',
          accessor: (p) => (
            <a href={`/admin/properties/${p.id}`} className="text-brand-600 hover:text-brand-700 font-medium text-sm">Editar</a>
          ),
        },
      ]}
      emptyMessage="No hay propiedades registradas."
    />
  )
}
