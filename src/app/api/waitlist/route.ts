import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

// Validation schema
const WaitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
});

// Type for waitlist entry
interface WaitlistEntry {
  id: string;
  email: string;
  firstName: string;
  timestamp: string;
  position: number;
}

// Path to waitlist data file
const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(WAITLIST_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load existing waitlist data
function loadWaitlist(): WaitlistEntry[] {
  ensureDataDirectory();
  try {
    if (fs.existsSync(WAITLIST_FILE)) {
      const data = fs.readFileSync(WAITLIST_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading waitlist:', error);
  }
  return [];
}

// Save waitlist data
function saveWaitlist(waitlist: WaitlistEntry[]) {
  ensureDataDirectory();
  try {
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));
  } catch (error) {
    console.error('Error saving waitlist:', error);
    throw error;
  }
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = WaitlistSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const { email, firstName } = result.data;
    
    // Load existing waitlist
    const waitlist = loadWaitlist();
    
    // Check if email already exists
    const existingEntry = waitlist.find(entry => entry.email.toLowerCase() === email.toLowerCase());
    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already registered', position: existingEntry.position },
        { status: 409 }
      );
    }

    // Create new entry
    const newEntry: WaitlistEntry = {
      id: generateId(),
      email: email.toLowerCase(),
      firstName: firstName.trim(),
      timestamp: new Date().toISOString(),
      position: waitlist.length + 1
    };

    // Add to waitlist and save
    waitlist.push(newEntry);
    saveWaitlist(waitlist);

    // Return success response
    return NextResponse.json({
      success: true,
      message: `Welcome ${firstName}! You're on the waitlist.`,
      position: newEntry.position,
      totalUsers: waitlist.length
    });

  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve waitlist stats
export async function GET() {
  try {
    const waitlist = loadWaitlist();
    return NextResponse.json({
      totalUsers: waitlist.length,
      latestSignups: waitlist.slice(-5).map(entry => ({
        firstName: entry.firstName,
        timestamp: entry.timestamp
      }))
    });
  } catch (error) {
    console.error('Error retrieving waitlist stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}