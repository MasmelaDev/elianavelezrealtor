import { DataTable } from './DataTable'
import { Badge } from '../ui/Badge'
import type { BlogPost } from '../../types'

export function BlogTable({ data }: { data: BlogPost[] }) {
  return (
    <DataTable
      data={data}
      keyExtractor={(p) => p.id}
      columns={[
        { header: 'Slug', accessor: (p) => <span className="font-mono text-gray-500">{p.slug}</span> },
        { header: 'Título (ES)', accessor: 'titleEs' },
        {
          header: 'Publicado',
          accessor: (p) => (
            <Badge variant={p.published ? 'success' : 'default'}>
              {p.published ? 'Sí' : 'No'}
            </Badge>
          ),
        },
        {
          header: '',
          accessor: (p) => (
            <a href={`/admin/blog/${p.id}`} className="text-brand-600 hover:text-brand-700 font-medium text-sm">Editar</a>
          ),
        },
      ]}
      emptyMessage="No hay posts en el blog."
    />
  )
}
