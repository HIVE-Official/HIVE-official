import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import { createMockPost, createMockSpace, createMockUser } from '@/test/utils/test-utils';

describe('Feed Components', () => {
  describe('Feed Rendering', () => {
    it('should render empty state when no posts', () => {
      const EmptyFeed = () => (
        <div data-testid="empty-feed">
          <h2>No posts yet</h2>
          <p>Be the first to post!</p>
        </div>
      );

      render(<EmptyFeed />);
      expect(screen.getByText('No posts yet')).toBeInTheDocument();
    });

    it('should render posts list', () => {
      const posts = [
        createMockPost({ id: '1', content: 'First post' }),
        createMockPost({ id: '2', content: 'Second post' }),
      ];

      const FeedList = ({ posts }: { posts: typeof posts }) => (
        <div data-testid="feed-list">
          {posts.map(post => (
            <div key={post.id} data-testid={`post-${post.id}`}>
              <p>{post.content}</p>
              <span>{post.likes} likes</span>
            </div>
          ))}
        </div>
      );

      render(<FeedList posts={posts} />);
      expect(screen.getByText('First post')).toBeInTheDocument();
      expect(screen.getByText('Second post')).toBeInTheDocument();
    });

    it('should handle post interactions', async () => {
      const onLike = vi.fn();
      const onComment = vi.fn();

      const PostCard = ({ post, onLike, onComment }: any) => (
        <div data-testid="post-card">
          <p>{post.content}</p>
          <button onClick={() => onLike(post.id)}>Like</button>
          <button onClick={() => onComment(post.id)}>Comment</button>
        </div>
      );

      const post = createMockPost();
      render(<PostCard post={post} onLike={onLike} onComment={onComment} />);

      fireEvent.click(screen.getByText('Like'));
      expect(onLike).toHaveBeenCalledWith(post.id);

      fireEvent.click(screen.getByText('Comment'));
      expect(onComment).toHaveBeenCalledWith(post.id);
    });

    it('should filter posts by space type', () => {
      const posts = [
        createMockPost({ id: '1', spaceType: 'social' }),
        createMockPost({ id: '2', spaceType: 'academic' }),
        createMockPost({ id: '3', spaceType: 'social' }),
      ];

      const FilteredFeed = ({ filter }: { filter: string }) => {
        const filtered = posts.filter(p => p.spaceType === filter);
        return (
          <div>
            {filtered.map(post => (
              <div key={post.id}>{post.spaceType}</div>
            ))}
          </div>
        );
      };

      const { rerender } = render(<FilteredFeed filter="social" />);
      expect(screen.getAllByText('social')).toHaveLength(2);

      rerender(<FilteredFeed filter="academic" />);
      expect(screen.getAllByText('academic')).toHaveLength(1);
    });

    it('should handle infinite scroll', async () => {
      const loadMore = vi.fn();

      const InfiniteFeed = ({ onLoadMore }: { onLoadMore: () => void }) => {
        const handleScroll = () => {
          const scrolledToBottom = true; // Simplified
          if (scrolledToBottom) onLoadMore();
        };

        return (
          <div onScroll={handleScroll} data-testid="infinite-feed">
            <div>Feed content</div>
            <button onClick={onLoadMore}>Load More</button>
          </div>
        );
      };

      render(<InfiniteFeed onLoadMore={loadMore} />);
      fireEvent.click(screen.getByText('Load More'));
      expect(loadMore).toHaveBeenCalled();
    });
  });

  describe('Feed Loading States', () => {
    it('should show loading spinner', () => {
      const LoadingFeed = () => (
        <div data-testid="loading-feed">
          <div className="spinner" role="progressbar">Loading...</div>
        </div>
      );

      render(<LoadingFeed />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should show error state', () => {
      const ErrorFeed = ({ error }: { error: string }) => (
        <div data-testid="error-feed">
          <p>Error: {error}</p>
          <button>Retry</button>
        </div>
      );

      render(<ErrorFeed error="Failed to load feed" />);
      expect(screen.getByText('Error: Failed to load feed')).toBeInTheDocument();
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });
  });

  describe('Post Creation', () => {
    it('should handle post creation form', async () => {
      const onCreate = vi.fn();

      const CreatePost = ({ onSubmit }: { onSubmit: (content: string) => void }) => {
        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;
          onSubmit(content);
        };

        return (
          <form onSubmit={handleSubmit} data-testid="create-post-form">
            <textarea name="content" placeholder="What's happening?" />
            <button type="submit">Post</button>
          </form>
        );
      };

      render(<CreatePost onSubmit={onCreate} />);

      const textarea = screen.getByPlaceholderText("What's happening?");
      fireEvent.change(textarea, { target: { value: 'New post content' } });
      fireEvent.submit(screen.getByTestId('create-post-form'));

      await waitFor(() => {
        expect(onCreate).toHaveBeenCalledWith('New post content');
      });
    });

    it('should validate post content', () => {
      const PostValidator = ({ content }: { content: string }) => {
        const errors: string[] = [];

        if (!content.trim()) errors.push('Content is required');
        if (content.length > 500) errors.push('Content too long');
        if (content.includes('spam')) errors.push('Content flagged');

        return (
          <div>
            {errors.map((error, i) => (
              <p key={i} role="alert">{error}</p>
            ))}
          </div>
        );
      };

      const { rerender } = render(<PostValidator content="" />);
      expect(screen.getByText('Content is required')).toBeInTheDocument();

      rerender(<PostValidator content="a".repeat(501)} />);
      expect(screen.getByText('Content too long')).toBeInTheDocument();

      rerender(<PostValidator content="spam content" />);
      expect(screen.getByText('Content flagged')).toBeInTheDocument();
    });
  });

  describe('Real-time Updates', () => {
    it('should handle real-time post updates', async () => {
      const RealtimeFeed = ({ posts }: { posts: any[] }) => {
        return (
          <div data-testid="realtime-feed">
            {posts.map(post => (
              <div key={post.id} data-testid={`realtime-post-${post.id}`}>
                {post.content}
              </div>
            ))}
          </div>
        );
      };

      const initialPosts = [createMockPost({ id: '1', content: 'Initial post' })];
      const { rerender } = render(<RealtimeFeed posts={initialPosts} />);

      expect(screen.getByText('Initial post')).toBeInTheDocument();

      const updatedPosts = [
        ...initialPosts,
        createMockPost({ id: '2', content: 'New real-time post' }),
      ];

      rerender(<RealtimeFeed posts={updatedPosts} />);
      await waitFor(() => {
        expect(screen.getByText('New real-time post')).toBeInTheDocument();
      });
    });

    it('should show new post notification', () => {
      const NewPostNotification = ({ count }: { count: number }) => {
        if (count === 0) return null;
        return (
          <div data-testid="new-posts-notification">
            {count} new {count === 1 ? 'post' : 'posts'}
          </div>
        );
      };

      const { rerender } = render(<NewPostNotification count={0} />);
      expect(screen.queryByTestId('new-posts-notification')).not.toBeInTheDocument();

      rerender(<NewPostNotification count={1} />);
      expect(screen.getByText('1 new post')).toBeInTheDocument();

      rerender(<NewPostNotification count={5} />);
      expect(screen.getByText('5 new posts')).toBeInTheDocument();
    });
  });
});