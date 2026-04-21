import { Star, MapPin, Phone, MessageCircle, Heart, Trophy, Share2, Navigation, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Business } from "@/data/businesses";

interface BusinessCardProps {
  business: Business;
  onViewDetails: (id: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  rank?: number;
}

const BusinessCard = ({ business, onViewDetails, isFavorite, onToggleFavorite, rank }: BusinessCardProps) => {
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    `Hi! I found ${business.name} on LBPP and I'd like to know more about your services.`
  )}`;

  const isPopular = business.views >= 3000;

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: business.name,
      text: `Check out ${business.name} on LocalBiz — ${business.area}, Solapur`,
      url: `${window.location.origin}/?business=${business.id}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard!");
      }
    } catch {
      /* user cancelled */
    }
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(business.phone);
    toast.success(`${business.phone} copied!`);
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    business.address
  )}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {business.isFeatured && (
            <Badge className="bg-accent text-accent-foreground shadow-md">⭐ Featured</Badge>
          )}
          {isPopular && (
            <Badge className="gap-1 bg-primary text-primary-foreground shadow-md">
              <Trophy className="h-3 w-3" /> Popular in Solapur
            </Badge>
          )}
        </div>
        {business.offers && (
          <Badge className="absolute right-3 top-3 bg-destructive text-destructive-foreground shadow-md">
            🔥 Offer
          </Badge>
        )}
        {rank && (
          <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-md text-sm">
            #{rank}
          </div>
        )}
        {onToggleFavorite && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(business.id); }}
            className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition hover:bg-card"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
              }`}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3
            className="cursor-pointer text-lg font-bold leading-tight text-foreground transition-colors hover:text-primary"
            onClick={() => onViewDetails(business.id)}
          >
            {business.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-sm font-semibold text-accent">{business.rating}</span>
          </div>
        </div>

        <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{business.area}</span>
          <span className="mx-1">·</span>
          <span className="capitalize">{business.category.replace("-", " ")}</span>
        </div>

        {business.offers && (
          <p className="mb-3 rounded-md bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive">
            {business.offers}
          </p>
        )}

        <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {business.description}
        </p>

        {/* Actions */}
        <div className="flex gap-1.5">
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onViewDetails(business.id)}>
            View Details
          </Button>
          <Button size="sm" variant="ghost" title="WhatsApp" className="px-2 text-accent hover:bg-accent/10 hover:text-accent" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
          <Button size="sm" variant="ghost" title="Call" className="px-2 text-primary hover:bg-primary/10 hover:text-primary" asChild>
            <a href={`tel:${business.phone}`} onClick={(e) => e.stopPropagation()}>
              <Phone className="h-4 w-4" />
            </a>
          </Button>
          <Button size="sm" variant="ghost" title="Copy phone" className="px-2" onClick={handleCopyPhone}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" title="Directions" className="px-2" asChild>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <Navigation className="h-4 w-4" />
            </a>
          </Button>
          <Button size="sm" variant="ghost" title="Share" className="px-2" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
