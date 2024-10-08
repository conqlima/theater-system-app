import { PlayRepository } from '@/app/repository/playRepository';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')
    const playRepository = new PlayRepository();
    const plays = await playRepository.getAllPlaysPaginated(parseInt(page as string) || 1);
    return NextResponse.json(plays);
}