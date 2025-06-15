import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const EditPostSchema = z.object({
  content: z.string().min(1).max(500),
  type: z.enum(['text', 'image', 'poll', 'event', 'toolshare']).optional(),
  metadata: z.record(z.any()).optional(),
});

const ReactToPostSchema = z.object({
  reaction: z.enum(['heart']),
  action: z.enum(['add', 'remove']),
});

// GET /api/spaces/[spaceId]/posts/[postId] - Get a specific post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> }
) {
  try {
    const { spaceId, postId } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is member of the space
    const memberDoc = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(user.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json({ error: 'Not a member of this space' }, { status: 403 });
    }

    // Get the post
    const postDoc = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId)
      .get();

    if (!postDoc.exists) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postData = postDoc.data();
    
    // Get author info
    const authorDoc = await db.collection('users').doc(postData!.authorId).get();
    const author = authorDoc.exists ? authorDoc.data() : null;

    const post = {
      id: postDoc.id,
      ...postData,
      author: author ? {
        id: authorDoc.id,
        fullName: author.fullName,
        handle: author.handle,
        photoURL: author.photoURL,
      } : null,
    };

    return NextResponse.json({ post });

  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PATCH /api/spaces/[spaceId]/posts/[postId] - Edit a post
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> }
) {
  try {
    const { spaceId, postId } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = EditPostSchema.parse(body);

    // Get the post
    const postDoc = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId)
      .get();

    if (!postDoc.exists) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postData = postDoc.data()!;
    
    // Check if post is within edit window (15 minutes)
    const createdAt = postData.createdAt.toDate();
    const now = new Date();
    const editWindowMs = 15 * 60 * 1000; // 15 minutes
    
    if (now.getTime() - createdAt.getTime() > editWindowMs) {
      return NextResponse.json({ 
        error: 'Edit window has expired. Posts can only be edited within 15 minutes of creation.' 
      }, { status: 400 });
    }

    // Check permissions - only author can edit
    if (postData.authorId !== user.uid) {
      return NextResponse.json({ error: 'Only the author can edit this post' }, { status: 403 });
    }

    // Update the post
    await db
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId)
      .update({
        ...validatedData,
        isEdited: true,
        updatedAt: new Date(),
      });

    // Get updated post with author info
    const updatedPostDoc = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId)
      .get();

    const updatedPostData = updatedPostDoc.data()!;
    const authorDoc = await db.collection('users').doc(updatedPostData.authorId).get();
    const author = authorDoc.data();

    const updatedPost = {
      id: updatedPostDoc.id,
      ...updatedPostData,
      author: {
        id: updatedPostData.authorId,
        fullName: author?.fullName || 'Unknown User',
        handle: author?.handle || 'unknown',
        photoURL: author?.photoURL || null,
      }
    };

    return NextResponse.json({ post: updatedPost });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid post data', 
        details: error.errors 
      }, { status: 400 });
    }

    console.error('Error editing post:', error);
    return NextResponse.json({ error: 'Failed to edit post' }, { status: 500 });
  }
}

// DELETE /api/spaces/[spaceId]/posts/[postId] - Delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> }
) {
  try {
    const { spaceId, postId } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the post
    const postDoc = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId)
      .get();

    if (!postDoc.exists) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postData = postDoc.data()!;

    // Check permissions - author, space builders, or admins can delete
    const memberDoc = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(user.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json({ error: 'Not a member of this space' }, { status: 403 });
    }

    const memberData = memberDoc.data()!;
    const canDelete = postData.authorId === user.uid || 
                     memberData.role === 'builder' || 
                     memberData.role === 'admin';

    if (!canDelete) {
      return NextResponse.json({ error: 'Insufficient permissions to delete this post' }, { status: 403 });
    }

    // Soft delete the post
    await db
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId)
      .update({
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: user.uid,
      });

    return NextResponse.json({ message: 'Post deleted successfully' });

  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

// POST /api/spaces/[spaceId]/posts/[postId] - React to a post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string; postId: string }> }
) {
  try {
    const { spaceId, postId } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = ReactToPostSchema.parse(body);

    // Check if user is member of the space
    const memberDoc = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(user.uid)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json({ error: 'Not a member of this space' }, { status: 403 });
    }

    // Get the post
    const postRef = db
      .collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .doc(postId);

    const postDoc = await postRef.get();
    if (!postDoc.exists) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postData = postDoc.data()!;
    const { reaction, action } = validatedData;

    // Update reactions
    const currentReactions = postData.reactions || {};
    const currentReactedUsers = postData.reactedUsers || {};

    if (action === 'add') {
      // Add reaction
      currentReactions[reaction] = (currentReactions[reaction] || 0) + 1;
      
      if (!currentReactedUsers[reaction]) {
        currentReactedUsers[reaction] = [];
      }
      
      if (!currentReactedUsers[reaction].includes(user.uid)) {
        currentReactedUsers[reaction].push(user.uid);
      }
    } else {
      // Remove reaction
      currentReactions[reaction] = Math.max((currentReactions[reaction] || 0) - 1, 0);
      
      if (currentReactedUsers[reaction]) {
        currentReactedUsers[reaction] = currentReactedUsers[reaction].filter(
          (uid: string) => uid !== user.uid
        );
      }
    }

    // Update the post
    await postRef.update({
      reactions: currentReactions,
      reactedUsers: currentReactedUsers,
      updatedAt: new Date(),
    });

    return NextResponse.json({ 
      message: `Reaction ${action}ed successfully`,
      reactions: currentReactions 
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid reaction data', 
        details: error.errors 
      }, { status: 400 });
    }

    console.error('Error updating reaction:', error);
    return NextResponse.json({ error: 'Failed to update reaction' }, { status: 500 });
  }
} 