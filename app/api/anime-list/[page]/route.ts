// File: /app/api/top-airing/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Gogoanime from '@consumet/extensions/dist/providers/anime/gogoanime';

export async function GET(request:NextRequest,{params}:{params:{page:number}}) {
  try {
    const gogoanime=new Gogoanime();
    const page =  (params.page)||1;

    // Validate page parameter
    if (isNaN(page) || page < 1) {
        return NextResponse.json(
            { error: 'Invalid page number' },
            { status: 400 }
        );
        }
        const animeList = await gogoanime.fetchAnimeList(page);
    return NextResponse.json(animeList);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch anime movies' },
      { status: 500 }
    );
  }
}

