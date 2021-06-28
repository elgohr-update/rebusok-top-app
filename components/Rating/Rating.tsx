import React, {useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef} from 'react';
import {RatingProps} from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import cn from 'classnames';

const Rating = forwardRef(({rating, error, setRating, isEditable = true, ...resProps}: RatingProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span onMouseEnter={() => changeDisplay(i + 1)}
                      onMouseLeave={() => changeDisplay(rating)}
                      className={cn(styles.star, {
                          [styles.filled]: i < currentRating,
                          [styles.editable]: isEditable
                      })}
                      onClick={() => onClickHandler(i + 1)}

                >
                    <StarIcon
                        className={cn({
                            [styles.filled]: i < currentRating,
                            [styles.editable]: isEditable
                        })}
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
                    />
                </span>

            );
        });
        setRatingArray(updatedArray);
    };
    const changeDisplay = (i: number) => {
        if (!isEditable) return;
        constructRating(i);
    };
    const onClickHandler = (i: number) => {
        if (!isEditable || !setRating) return;
        setRating(i);
    };
    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
        if (e.code != 'Space' || !setRating) return;
        setRating(i);
    };
    return (
        <div {...resProps} ref={ref} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}>
            {ratingArray.map((r, i) =>
                (<span key={i}
                >
                    {r}
                </span>)
            )}
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});

export default Rating;