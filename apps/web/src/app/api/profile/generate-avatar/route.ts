import { NextRequest, NextResponse } from 'next/server';

// In-memory store for development mode profile data (shared with profile route)
const devProfileStore: Record<string, any> = {};

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Handle development mode
    if (token === 'test-token' || token.startsWith('dev_token_')) {
      const userId = token.startsWith('dev_token_') ? token.replace('dev_token_', '') : '123';
      
      // Generate a random avatar using DiceBear API
      const styles = ['avataaars', 'big-smile', 'adventurer', 'personas', 'miniavs'];
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      const randomSeed = Date.now() + Math.random();
      
      const avatarUrl = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
      
      // Store the avatar URL in development profile store
      devProfileStore[userId] = {
        ...devProfileStore[userId],
        avatarUrl,
        profilePhoto: avatarUrl,
      };
      
      console.log('Development mode: Generated avatar URL:', avatarUrl);
      console.log('Stored in dev profile store:', devProfileStore[userId]);
      
      return NextResponse.json({
        success: true,
        message: 'Avatar generated successfully (development mode)',
        avatarUrl,
        developmentMode: true
      });
    }

    // TODO: Implement actual avatar generation and Firebase integration
    // For now, return placeholder success  
    const styles = ['avataaars', 'big-smile', 'adventurer', 'personas', 'miniavs'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomSeed = Date.now() + Math.random();
    
    const avatarUrl = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
    
    return NextResponse.json({
      success: true,
      message: 'Avatar generated successfully',
      avatarUrl
    });

  } catch (error) {
    console.error('Avatar generation error:', error);
    return NextResponse.json({ error: 'Failed to generate avatar' }, { status: 500 });
  }
}