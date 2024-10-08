import { Play } from "../domain/play";
import { v4 as uuid } from 'uuid'
import { IPlayRepository } from "../interfaces/IPlayRepository";

const items: Play[] = [
    { id: uuid(), name: 'Fulano de tal', status: 'active', imageURL: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80', createdAt: '2023-07-11 10:42 AM' },
    { id: uuid(), name: 'Ciclano e tal', status: 'draft', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-12 10:56 PM' },
    { id: uuid(), name: 'Gabriel Queiroz', status: 'archived', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-13 10:56 AM' },
    { id: uuid(), name: 'Will smith', status: 'archived', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-14 10:32 AM' },
    { id: uuid(), name: 'Agata', status: 'active', imageURL: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'active', imageURL: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'active', imageURL: 'https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'active', imageURL: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'active', imageURL: 'https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'active', imageURL: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'draft', imageURL: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'draft', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'draft', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'archived', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'archived', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'archived', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
];

export class PlayRepository implements IPlayRepository {

    async getPlayById(id: string): Promise<Play | null> {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) return null;
        return await response.json();
    }

    async getAllPlays(): Promise<Play[]> {
        return items;
    }

    async getAllPlaysPaginated(page: number): Promise<PaginatedData<Play>> {
        const ITEMS_PER_PAGE = 5;
        
        // Calculate the start index and end index for the paginated items
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
        
        // Determine total pages based on the total number of items
        const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

        const paginatedData: PaginatedData<Play> = {
            items: paginatedItems,
            totalPages: totalPages,
            currentPage: page
        };

        return paginatedData;
    }

    // async createReservation(user: Reservation): Promise<Reservation> {
    //     const response = await fetch('/api/users', {
    //         method: 'POST',
    //         body: JSON.stringify(user),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     return await response.json();
    // }
}