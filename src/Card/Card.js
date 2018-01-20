import React from 'react';


const Card = (props) => {
    let cardsSuit = {
        D: ['diams', '♦'],
        H: ['hearts', '♥'],
        C: ['clubs', '♣'],
        S: ['spades', '♠']
    };

    let cardClass = 'card rank-'+ props.rank.toLowerCase() + ' ' + cardsSuit[props.suit][0];

    return (
        <div className={cardClass}>
          <span className="rank">{props.rank}</span>
          <span className="suit">{cardsSuit[props.suit][1]}</span>
        </div>
    );
};

export default Card;