import { Reservation } from "../domain/reservation";
import { IReservationRepository } from "../interfaces/IReservationRepository";
import { v4 as uuid } from 'uuid'

export class ReservationRepository implements IReservationRepository {

    async getReservationById(id: string): Promise<Reservation | null> {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) return null;
        return await response.json();
    }

    async getAllReservations(): Promise<Reservation[]> {
        const items: Reservation[] = [
            { id: uuid(), name: 'Fulano de tal', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-11 10:42 AM' },
            { id: uuid(), name: 'Ciclano e tal', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-12 10:56 PM' },
            { id: uuid(), name: 'Gabriel Queiroz', status: 'approved', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-13 10:56 AM' },
            { id: uuid(), name: 'Will smith', status: 'approved', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-14 10:32 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
            { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
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