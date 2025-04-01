import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Send, MessageSquare } from 'lucide-react';
import { Comment } from '@/data/videos';
import { Button } from './ui/button';

interface CommentSectionProps {
  comments: Comment[];
  totalComments: number;
  videoId?: string;
}

// Function to generate a random user profile picture
const getRandomProfilePic = (): string => {
  const gender = Math.random() > 0.5 ? 'men' : 'women';
  const id = Math.floor(Math.random() * 99) + 1;
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments: initialComments, totalComments, videoId }) => {
  const [newComment, setNewComment] = useState('');
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // Load comments from localStorage when component mounts
  useEffect(() => {
    if (videoId) {
      try {
        const savedComments = localStorage.getItem(`youtube-clone-comments-${videoId}`);
        if (savedComments) {
          const parsedComments = JSON.parse(savedComments);
          if (Array.isArray(parsedComments) && parsedComments.length > 0) {
            setComments(parsedComments);
          }
        }
      } catch (error) {
        console.error('Failed to load comments from localStorage:', error);
      }
    }
  }, [videoId]);

  // Save comments to localStorage when they change
  useEffect(() => {
    if (videoId && comments.length > 0) {
      try {
        localStorage.setItem(`youtube-clone-comments-${videoId}`, JSON.stringify(comments));
      } catch (error) {
        console.error('Failed to save comments to localStorage:', error);
      }
    }
  }, [comments, videoId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: `c${Date.now()}`,
        username: 'You',
        profilePic: getRandomProfilePic(),
        content: newComment,
        timestamp: 'Just now',
        likes: 0
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      setIsCommentFormOpen(false);
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium text-lg mb-4 text-foreground">{comments.length} Comments</h3>
      
      {/* Add Comment Form */}
      <div className="flex mb-6">
        <img 
          src="https://randomuser.me/api/portraits/men/85.jpg" 
          alt="Your profile" 
          className="w-10 h-10 rounded-full mr-3"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40x40?text=You';
            // Also hide the error by stopping propagation
            e.stopPropagation();
          }}
        />
        <div className="flex-grow">
          {!isCommentFormOpen ? (
            <div 
              className="w-full p-2 border-b border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              onClick={() => setIsCommentFormOpen(true)}
            >
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>Add a comment...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitComment} className="w-full">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                autoFocus
                rows={3}
                className="w-full p-2 border-b border-gray-300 dark:border-gray-700 focus:border-b-2 focus:border-gray-800 dark:focus:border-gray-400 outline-none bg-transparent text-foreground resize-none"
              />
              <div className="flex justify-end mt-2 space-x-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setIsCommentFormOpen(false);
                    setNewComment('');
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={!newComment.trim()}
                  variant="default"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-400"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Comment
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex">
            <img 
              src={comment.profilePic} 
              alt={comment.username} 
              className="w-10 h-10 rounded-full mr-3"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${comment.username.charAt(0)}&background=random&color=fff&size=40`;
                // Prevent infinite error loops
                (e.target as HTMLImageElement).onerror = null;
              }}
            />
            <div className="flex-grow">
              <div className="flex items-center">
                <h4 className="font-medium text-sm text-foreground">{comment.username}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{comment.timestamp}</span>
              </div>
              <p className="mt-1 text-sm text-foreground">{comment.content}</p>
              <div className="flex items-center mt-1 space-x-4">
                <button 
                  className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">{comment.likes}</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <ThumbsDown className="h-4 w-4" />
                </button>
                <button className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:underline">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
