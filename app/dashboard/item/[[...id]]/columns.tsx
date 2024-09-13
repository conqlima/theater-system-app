"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HorariosReserva = {
  dataExibicao: string | undefined
  horaExibicao: string | undefined
  dataHora: string
}

export const columns: ColumnDef<HorariosReserva>[] = [
  {
    accessorKey: "dataExibicao",
    header: "Data",
  },
  {
    accessorKey: "horaExibicao",
    header: "Hora",
  }
]
