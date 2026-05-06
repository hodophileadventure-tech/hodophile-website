import { NextResponse } from 'next/server';
import { getDestinations, getHotels, getTours } from '@/lib/db';

// Get all destinations
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    if (type === 'destinations') {
      const destinations = await getDestinations();
      return NextResponse.json(destinations);
    }

    if (type === 'hotels') {
      const destinationId = searchParams.get('destinationId');
      const hotels = await getHotels(destinationId || undefined);
      return NextResponse.json(hotels);
    }

    if (type === 'tours') {
      const destinationId = searchParams.get('destinationId');
      const tours = await getTours(destinationId || undefined);
      return NextResponse.json(tours);
    }

    return NextResponse.json(
      { error: 'Invalid type parameter. Use: destinations, hotels, or tours' },
      { status: 400 },
    );
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
