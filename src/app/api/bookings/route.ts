import { NextRequest, NextResponse } from 'next/server';
import { createBooking, getBookingById, getBookingsByClient } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      tourId,
      roomId,
      clientName,
      clientPhone,
      clientEmail,
      numberOfRooms,
      numberOfNights,
      checkInDate,
      checkOutDate,
      adultsCount,
      kidsCount,
      totalPrice,
      specialRequests,
    } = body;

    if (!tourId || !roomId || !clientName || !clientPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const booking = await createBooking({
      tourId,
      roomId,
      clientName,
      clientPhone,
      clientEmail,
      numberOfRooms,
      numberOfNights,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      adultsCount: adultsCount || 2,
      kidsCount: kidsCount || 0,
      totalPrice,
      specialRequests,
    });

    // TODO: Send booking confirmation email
    // TODO: Send WhatsApp booking details
    // TODO: Generate booking PDF

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        booking,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const bookingId = request.nextUrl.searchParams.get('id');
    const clientPhone = request.nextUrl.searchParams.get('phone');

    if (bookingId) {
      const booking = await getBookingById(bookingId);
      return NextResponse.json(booking || { error: 'Booking not found' }, { status: booking ? 200 : 404 });
    }

    if (clientPhone) {
      const bookings = await getBookingsByClient(clientPhone);
      return NextResponse.json(bookings);
    }

    return NextResponse.json({ error: 'Provide booking ID or client phone' }, { status: 400 });
  } catch (error) {
    console.error('Booking retrieval error:', error);
    return NextResponse.json({ error: 'Failed to retrieve bookings' }, { status: 500 });
  }
}
