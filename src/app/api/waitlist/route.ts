import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const waitlistSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName } = waitlistSchema.parse(body);

    // TODO: Replace with actual email service integration
    // For now, just log the submission
    console.log('Waitlist submission:', { email, firstName });

    // Here you would typically:
    // 1. Save to database
    // 2. Send to email marketing service (ConvertKit, Mailchimp, etc.)
    // 3. Send welcome email

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist!' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid form data',
          errors: error.issues 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}