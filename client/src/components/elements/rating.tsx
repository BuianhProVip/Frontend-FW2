import React, { useState } from 'react'

type Props = {}

const rating = (props: Props) => {
    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
    };
  return (
    <>
     <div className="rating">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={starValue}
                        className={`star ${starValue <= rating ? 'selected' : ''}`}
                        onClick={() => handleClick(starValue)}
                    >
                        &#9733;
                    </span>
                );
            })}
            <div id="rating-result">Bạn đã đánh giá: {rating} sao</div>
        </div>
    </>
  )
}

export default rating