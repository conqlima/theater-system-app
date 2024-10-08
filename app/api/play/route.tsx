import { PlayRepository } from '@/app/repository/playRepository';
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