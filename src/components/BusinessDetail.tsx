import { Star, MapPin, Phone, MessageCircle, Clock, ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Business, Review } from "@/data/businesses";
import ReviewForm from "./ReviewForm";

interface BusinessDetailProps {
  business: Business;
  onBack: () => void;
  reviews: Review[];
  onAddReview: (review: { businessId: string; author: string; rating: number; comment: string }) => void;
}

const BusinessDetail = ({ business, onBack, reviews, onAddReview }: BusinessDetailProps) => {
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    `Hi! I found ${business.name} on LBPP. I'd like to inquire about your services. Could you share more details?`
  )}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header image */}
      <div className="relative h-56 sm:h-72 md:h-80">
        <img src={business.image} alt={business.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute left-4 top-4 bg-card/80 text-foreground backdrop-blur-sm hover:bg-card"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        {business.isFeatured && (
          <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground">⭐ Featured</Badge>
        )}
      </div>

      <div className="container -mt-12 pb-20 sm:-mt-16">
        <div className="rounded-xl border border-border bg-card p-5 shadow-hero sm:p-8">
          {/* Title */}
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-1 text-2xl font-extrabold sm:text-3xl">{business.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{business.area}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{business.openHours}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="text-xl font-bold text-accent">{business.rating}</span>
              <span className="text-sm text-muted-foreground">({business.reviewCount})</span>
            </div>
          </div>

          {business.offers && (
            <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <p className="font-semibold text-destructive">🔥 {business.offers}</p>
            </div>
          )}

          <p className="mb-6 leading-relaxed text-muted-foreground">{business.description}</p>

          {/* Services */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-bold">Services</h3>
            <div className="flex flex-wrap gap-2">
              {business.services.map((s) => (
                <Badge key={s} variant="secondary" className="px-3 py-1 text-sm">{s}</Badge>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Contact actions */}
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <Button className="h-12 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
              </a>
            </Button>
            <Button className="h-12" asChild>
              <a href={`tel:${business.phone}`}>
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </a>
            </Button>
            <Button variant="outline" className="h-12" asChild>
              <a href={business.mapUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" /> Get Directions
              </a>
            </Button>
          </div>

          {/* Address */}
          <div className="mb-8 rounded-lg bg-secondary p-4">
            <p className="text-sm font-medium text-foreground"><MapPin className="mr-1 inline h-4 w-4" />{business.address}</p>
          </div>

          <Separator className="my-6" />

          {/* Write Review */}
          <div className="mb-8">
            <ReviewForm businessId={business.id} onSubmit={onAddReview} />
          </div>

          {/* Reviews */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Reviews ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet. Be the first!</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="rounded-lg border border-border bg-background p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold">{r.author}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{r.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
