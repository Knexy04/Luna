import Icon from '@mdi/react';
import { mdiStar, mdiStarOutline } from '@mdi/js';

interface StarRatingProps {
    rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    const starsArray = Array(totalStars).fill(false).fill(true, 0, filledStars);

    return (
        <div className="flex">
            {starsArray.map((isFilled, index) => (
                <Icon key={index} path={isFilled ? mdiStar : mdiStarOutline} size={1} />
            ))}
        </div>
    );
};

export default StarRating;