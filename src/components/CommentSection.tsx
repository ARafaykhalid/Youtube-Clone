import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Send, MessageSquare } from 'lucide-react';
import { Comment } from '@/data/videos';
import { Button } from './ui/button';
import { getUserProfile } from '@/data/userData';
import { toast } from 'sonner';

interface CommentSectionProps {
  comments: Comment[];
  totalComments: number;
  videoId?: string;
}

// Function to get user's profile picture from userData
const getUserProfilePic = (): string => {
  const userProfile = getUserProfile();
  return userProfile.profilePicture;
};

// Function to get user's display name from userData
const getUserDisplayName = (): string => {
  const userProfile = getUserProfile();
  return userProfile.displayName;
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments: initialComments, totalComments, videoId }) => {
  const [newComment, setNewComment] = useState('');
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [userProfilePic, setUserProfilePic] = useState(getUserProfilePic());
  const [userDisplayName, setUserDisplayName] = useState(getUserDisplayName());

  // Load comments from localStorage when component mounts
  useEffect(() => {
    if (!videoId) {
      // If no videoId provided, just use initial comments but don't persist
      setComments(initialComments || []);
      return;
    }

    try {
      const storageKey = `youtube-clone-comments-${videoId}`;
      const savedComments = localStorage.getItem(storageKey);
      
      if (savedComments) {
        try {
          const parsedComments = JSON.parse(savedComments);
          
          if (Array.isArray(parsedComments)) {
            // Successfully loaded comments from localStorage
            setComments(parsedComments);
            return;
          }
        } catch (parseError) {
          console.error('Failed to parse comments from localStorage:', parseError);
          // Continue to fallback options
        }
      }
      
      // Fallback: If we couldn't load from localStorage or it was invalid,
      // use initial comments if available
      if (initialComments && initialComments.length > 0) {
        setComments(initialComments);
        // Store initial comments in localStorage for future visits
        localStorage.setItem(storageKey, JSON.stringify(initialComments));
      }
    } catch (error) {
      console.error('Failed to load comments from localStorage:', error);
      toast.error('Failed to load comments');
      
      // Fallback to initial comments in case of error
      if (initialComments) {
        setComments(initialComments);
      }
    }
    
    // Update user profile data
    setUserProfilePic(getUserProfilePic());
    setUserDisplayName(getUserDisplayName());
  }, [videoId, initialComments]);

  // Save comments to localStorage when they change
  useEffect(() => {
    if (!videoId) return;
    
    try {
      const storageKey = `youtube-clone-comments-${videoId}`;
      localStorage.setItem(storageKey, JSON.stringify(comments));
    } catch (error) {
      console.error('Failed to save comments to localStorage:', error);
      toast.error('Failed to save your comment');
    }
  }, [comments, videoId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: `c${Date.now()}`,
        username: userDisplayName,
        profilePic: userProfilePic,
        content: newComment,
        timestamp: 'Just now',
        likes: 0
      };
      
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      setIsCommentFormOpen(false);
      
      toast.success('Comment added successfully');
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
          src={userProfilePic} 
          alt={userDisplayName} 
          className="w-10 h-10 rounded-full mr-3"
          onError={(e) => {
            const initial = userDisplayName.charAt(0).toUpperCase();
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${initial}&background=4285F4&color=fff&size=40`;
            // Prevent infinite error loops
            (e.target as HTMLImageElement).onerror = null;
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
                <span>Add a comment as {userDisplayName}...</span>
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
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-400 rounded-full"
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
                const initial = comment.username.charAt(0).toUpperCase();
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${initial}&background=4285F4&color=fff&size=40`;
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
