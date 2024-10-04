import { Play } from "../domain/play";
import { v4 as uuid } from 'uuid'
import { IPlayRepository } from "../interfaces/IPlayRepository";

export class PlayRepository implements IPlayRepository {

    async getPlayById(id: string): Promise<Play | null> {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) return null;
        return await response.json();
    }

    async getAllPlays(): Promise<Play[]> {
        const items: Play[] = [
            { id: uuid(), name: 'Fulano de tal', status: 'active', imageURL: '/placeholder.svg', createdAt: '2023-07-11 10:42 AM' },
            { id: uuid(), name: 'Ciclano e tal', status: 'draft', imageURL: '/placeholder.svg', createdAt: '2023-07-12 10:56 PM' },
            { id: uuid(), name: 'Gabriel Queiroz', status: 'archived', imageURL: '/placeholder.svg', createdAt: '2023-07-13 10:56 AM' },
            { id: uuid(), name: 'Will smith', status: 'archived', imageURL: '/placeholder.svg', createdAt: '2023-07-14 10:32 AM' },
            { id: uuid(), name: 'Agata', status: 'active', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'active', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'active', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'active', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'active', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'active', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'draft', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'draft', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'draft', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'archived', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'archived', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'archived', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
        ];

        return items;
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