import { Reservation } from "../../domain/reservation";
import { IReservationRepository } from "../interfaces/IReservationRepository";
import { v4 as uuid } from 'uuid'

const items: Reservation[] = [
    { id: uuid(), name: 'Fulano de tal', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80', createdAt: '2023-07-11 10:42 AM' },
    { id: uuid(), name: 'Ciclano e tal', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-12 10:56 PM' },
    { id: uuid(), name: 'Gabriel Queiroz', status: 'approved', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-13 10:56 AM' },
    { id: uuid(), name: 'Will smith', status: 'approved', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80', createdAt: '2023-07-14 10:32 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
];

export class ReservationRepository implements IReservationRepository {

    async getReservationById(id: string): Promise<Reservation | undefined> {
        const foundItem = items.find((item) => item.id === id);
        return foundItem;
    }

    async getAllReservations(): Promise<Reservation[]> {
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