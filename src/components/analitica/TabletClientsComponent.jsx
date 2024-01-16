import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'

import { useState } from 'react'

function TabletClientsComponent({ data, columns }) {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  })

  return (
    <section className="container mx-auto mt-5">
      <div className="grid gap-y-5">
        <input
          type="text"
          placeholder="Filtrar por cedula"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value.trim())}
          className="rounded-lg px-4 py-2 mx-5 lg:m-0"
        />

        <table className="bg-[#1c263b] text-neutral-200 rounded-lg mx-5 lg:m-0">
          <thead className="">
            {table.getHeaderGroups().map((headerGroup, index) => (
              <tr key={index} className="bg-[#5438CE]">
                {headerGroup.headers.map((header, subIndex) => (
                  <th
                    key={subIndex}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer p-2 border border-neutral-700"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {
                          { asc: '⬆️', desc: '⬇️' }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              console.log(row.original)
              return (
                <tr key={row.original.id}>
                  {row.getVisibleCells().map((cell, subIndex) => (
                    <td
                      key={subIndex}
                      className="p-2 border border-neutral-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup, index) => (
              <tr key={index}>
                {footerGroup.headers.map((footer, subIndex) => (
                  <th key={subIndex}>
                    {flexRender(
                      footer.column.columnDef.footer,
                      footer.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className="flex gap-5 justify-center">
          <button
            className="px-4 py-2 rounded-lg bg-[#5438CE] text-neutral-100 text-sm hover:bg-[#5438ce93] transition-colors duration-300"
            onClick={() => table.setPageIndex(0)}
          >
            Primer Pagina
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[#5438CE] text-neutral-100 text-sm hover:bg-[#5438ce93] transition-colors duration-300"
            onClick={() => table.previousPage()}
          >
            Pagina Anterior
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[#5438CE] text-neutral-100 text-sm hover:bg-[#5438ce93] transition-colors duration-300"
            onClick={() => table.nextPage()}
          >
            Pagina Siguiente
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[#5438CE] text-neutral-100 text-sm hover:bg-[#5438ce93] transition-colors duration-300"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Ultima Pagina
          </button>
          <div className=" flex items-center text-white text-sm">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TabletClientsComponent
