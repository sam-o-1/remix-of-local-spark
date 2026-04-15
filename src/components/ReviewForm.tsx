import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormProps {
  businessId: string;
  onSubmit: (review: { businessId: string; author: string; rating: number; comment: string }) => void;
}

const ReviewForm = ({ businessId, onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!rating || !author.trim() || !comment.trim()) return;
    onSubmit({ businessId, author: author.trim(), rating, comment: comment.trim() });
    setRating(0);
    setAuthor("");
    setComment("");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h4 className="mb-4 text-base font-bold text-foreground">Write a Review</h4>

      {/* Star rating */}
      <div className="mb-4">
        <p className="mb-2 text-sm text-muted-foreground">Your rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              onMouseEnter={() => setHoveredStar(s)}
              onMouseLeave={() => setHoveredStar(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-7 w-7 ${
                  s <= (hoveredStar || rating)
                    ? "fill-accent text-accent"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <Input
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="bg-background"
        />
      </div>

      <div className="mb-4">
        <Textarea
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="bg-background"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!rating || !author.trim() || !comment.trim()}
        className="bg-accent text-accent-foreground hover:bg-accent/90"
      >
        Submit Review
      </Button>
    </div>
  );
};

export default ReviewForm;
