import { ReservationRepository } from '@/app/repository/reservationRepository';
import { NextResponse } from 'next/server';

export async function GET() {

    const userRepository = new ReservationRepository();
    const reservations = await userRepository.getAllReservations();
    return NextResponse.json(reservations);
}