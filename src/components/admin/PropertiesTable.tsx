import { DataTable } from './DataTable'
import { Badge } from '../ui/Badge'
import type { Property } from '../../types'
import { Trash2, Edit2 } from 'lucide-react'

export function PropertiesTable({ data }: { data: Property[] }) {
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres borrar esta propiedad? Esta acción no se puede deshacer.')) return
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al borrar')
      window.location.reload()
    } catch (err) {
      alert('Error al borrar la propiedad')
    }
  }

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
            <div className="flex items-center gap-3 justify-end">
              <a href={`/admin/properties/${p.id}`} className="text-blue-600 hover:text-blue-800 transition-colors" title="Editar">
                <Edit2 className="h-4 w-4" />
              </a>
              <button 
                onClick={() => handleDelete(p.id)} 
                className="text-red-500 hover:text-red-700 transition-colors" 
                title="Borrar"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ),
        },
      ]}
      emptyMessage="No hay propiedades registradas."
    />
  )
}
