import React, { useState } from 'react';
import { Comment } from '@/data/videos';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface CommentSectionProps {
  comments: Comment[];
  totalComments: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, totalComments }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted comment:', newComment);
    setNewComment('');
    // In a real app, this would add the comment to the list
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium text-lg mb-4 text-foreground">{totalComments} Comments</h3>
      
      {/* Add Comment Form */}
      <div className="flex mb-6">
        <img 
          src="https://randomuser.me/api/portraits/men/85.jpg" 
          alt="Your profile" 
          className="w-10 h-10 rounded-full mr-3"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40x40?text=User';
          }}
        />
        <form onSubmit={handleSubmitComment} className="flex-grow">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border-b border-gray-300 dark:border-gray-700 focus:border-b-2 focus:border-gray-800 dark:focus:border-gray-400 outline-none bg-transparent text-foreground"
          />
          <div className="flex justify-end mt-2 space-x-2">
            <button 
              type="button" 
              className="px-3 py-1 text-sm font-medium rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
              onClick={() => setNewComment('')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={!newComment.trim()}
              className="px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-800/70 disabled:bg-gray-100 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-400"
            >
              Comment
            </button>
          </div>
        </form>
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
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40x40?text=User';
              }}
            />
            <div>
              <div className="flex items-center">
                <h4 className="font-medium text-sm text-foreground">{comment.username}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{comment.timestamp}</span>
              </div>
              <p className="mt-1 text-sm text-foreground">{comment.content}</p>
              <div className="flex items-center mt-1 space-x-4">
                <button className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
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
