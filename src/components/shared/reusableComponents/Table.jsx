'use client';


export default function DataTable({
  columns,
  data,
  actions,
  emptyMessage = 'لا توجد بيانات',
  className = ''
}) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* الجدول */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* الهيدر */}
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`p-3 text-sm font-medium text-gray-600 ${
                    col.align === 'center'
                      ? 'text-center'
                      : col.align === 'left'
                      ? 'text-left'
                      : 'text-right'
                  } whitespace-nowrap`}
                >
                  {col.header}
                </th>
              ))}

              {actions && (
                <th className="p-3 text-sm font-medium text-gray-600 text-center whitespace-nowrap">
                  الإجراءات
                </th>
              )}
            </tr>
          </thead>

          {/* البودي */}
          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`p-3 text-sm text-gray-700 ${
                      col.align === 'center'
                        ? 'text-center'
                        : col.align === 'left'
                        ? 'text-left'
                        : 'text-right'
                    }`}
                  >
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] || '')}
                  </td>
                ))}

                {actions && <td className="p-3 text-center">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* رسالة فارغة */}
      {data.length === 0 && (
        <div className="p-8 text-center text-gray-500">{emptyMessage}</div>
      )}
    </div>
  );
}
