import { HorariosReserva } from "@/app/domain/horariosReserva"

let items: HorariosReserva[] = []

export const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    items = updatedItems
};


export const insertItem = (item: HorariosReserva) => {
    items.push(item)
};