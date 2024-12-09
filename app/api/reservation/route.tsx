import { ReservationRepository } from '@/repository/reservationRepository';
import { NextResponse } from 'next/server';

export async function GET() {
    const reservationRepository = new ReservationRepository();
    const reservations = await reservationRepository.getAllReservations();
    return NextResponse.json(reservations);
}