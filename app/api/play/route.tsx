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
    const data = await request.json();

    if (Array.isArray(data)) {
        await playRepository.createBatchPlay(data as Play[]);
    }
    else {
        await playRepository.createPlay(data as Play);
    }
    return NextResponse.json({ message: 'Play created successfully' }, { status: 201 });
}
