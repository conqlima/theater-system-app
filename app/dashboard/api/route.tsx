import { PlayRepository } from '@/app/repository/playRepository';
import { NextResponse } from 'next/server';

export async function GET() {

    const playRepository = new PlayRepository();
    const plays = await playRepository.getAllPlays();
    return NextResponse.json(plays);
}