import React, { useState } from 'react';
import { DiscussionQuadrant, DiscussionComment } from '../types/course';
import { MessageSquare, ThumbsUp, CheckCircle, Award, Send, User } from 'lucide-react';

interface QuadrantDiscussionProps {
  unitId: number;
  discussionData: DiscussionQuadrant;
  comments: DiscussionComment[];
  isCompleted: boolean;
  onPostComment: (content: string) => Promise<void>;
  onUpvoteComment: (commentId: string) => Promise<void>;
}

export const QuadrantDiscussion: React.FC<QuadrantDiscussionProps> = ({
  unitId,
  discussionData,
  comments,
  isCompleted,
  onPostComment,
  onUpvoteComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'top' | 'latest'>('top');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onPostComment(newComment);
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'top') {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2528] mb-1">
            <span>Quadrant III · Moderated Social Debate</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500">{comments.length} contributions</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{discussionData.topicTitle}</h2>
        </div>

        <div>
          {isCompleted ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span>Debate Participated</span>
            </div>
          ) : (
            <div className="text-xs text-slate-500">
              Submit your argument to complete Quadrant III
            </div>
          )}
        </div>
      </div>

      {/* Provocation Box */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
          <MessageSquare className="h-4 w-4 text-[#8C2528]" />
          <span>Moderated Socratic Provocation</span>
        </div>
        <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
          "{discussionData.provocation}"
        </p>
      </div>

      {/* Argument Posting Box */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-700 font-bold">
            <User className="h-3.5 w-3.5 text-[#8C2528]" />
            <span>Draft Your Legal & Ethical Argument</span>
          </div>
          <span className="text-[11px] text-slate-400">Peer Deliberation Protocol</span>
        </div>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="State your thesis grounded in constitutional jurisprudence, human dignity, or economic realities..."
          rows={3}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#8C2528] focus:bg-white focus:outline-none"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-500">
            Participation awards 15% mastery toward CO3/CO4.
          </span>
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="flex items-center gap-1.5 rounded-lg bg-[#8C2528] px-4 py-2 text-xs font-semibold text-white hover:bg-[#A83236] transition-colors disabled:opacity-50 shadow-xs"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isSubmitting ? 'Posting...' : 'Submit to Cohort'}</span>
          </button>
        </div>
      </form>

      {/* Deliberations Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Cohort Deliberations ({comments.length})
          </h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sort by:</span>
            <button
              onClick={() => setSortBy('top')}
              className={`px-2 py-0.5 rounded font-medium ${
                sortBy === 'top' ? 'bg-red-50 text-[#8C2528] font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Top Upvoted
            </button>
            <button
              onClick={() => setSortBy('latest')}
              className={`px-2 py-0.5 rounded font-medium ${
                sortBy === 'latest' ? 'bg-red-50 text-[#8C2528] font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Chronological
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {sortedComments.map((comment) => (
            <div
              key={comment.id}
              className={`rounded-xl border p-4 space-y-2.5 transition-colors ${
                comment.isFacultyEndorsed
                  ? 'border-amber-300 bg-amber-50/40 shadow-xs'
                  : 'border-slate-200 bg-white shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase">
                    {comment.authorName.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900">
                      {comment.authorName}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-2">
                      {comment.authorRole}
                    </span>
                  </div>
                </div>

                {comment.isFacultyEndorsed && (
                  <span className="flex items-center gap-1 rounded-md border border-amber-200 bg-amber-100/70 px-2 py-0.5 text-[11px] font-semibold text-amber-900">
                    <Award className="h-3 w-3 text-amber-700" />
                    <span>Faculty Endorsed</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">{comment.content}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                <span>{comment.timestamp}</span>

                <button
                  onClick={() => onUpvoteComment(comment.id)}
                  className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-slate-600 hover:bg-slate-100 hover:text-[#8C2528] transition-colors"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span className="font-semibold">{comment.upvotes}</span>
                  <span className="hidden sm:inline">Agree</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
