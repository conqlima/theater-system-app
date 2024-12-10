import { Play } from '@/domain/play';
import { PlayRepository } from '@/repository/playRepository';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')
    const playRepository = new PlayRepository();
    let plays;
    
    if (page) {
        plays = await playRepository.getAllPlaysPaginated(parseInt(page as string) || 1);
    }
    else {
        plays = await playRepository.getAllPlays();
    }

    return NextResponse.json(plays);
}


export async function POST(request: NextRequest) {
    const playRepository = new PlayRepository();
    const play: Play = await request.json();

    try {
        await playRepository.createPlay(play);
        return NextResponse.json({ message: 'Play created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating play', error: error }, { status: 500 });
    }
}