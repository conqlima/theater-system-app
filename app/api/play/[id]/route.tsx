import { PlayRepository } from '@/repository/playRepository';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const playRepository = new PlayRepository();
    const play = await playRepository.getPlayById(id);
    return NextResponse.json(play);
}