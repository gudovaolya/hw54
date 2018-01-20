import React, { Component } from 'react';
import './App.css';
import Card from "./Card/Card";


const makeCards = () => {

    let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let suits = ['D', 'H', 'S', 'C'];
    let cardDesk = [];
    let cardCount = 0;

    for (let i = 0; i < ranks.length; i++){
        for (let j = 0; j < suits.length; j++){
           cardCount++;
           let oneCard = {};
           oneCard.rank = ranks[i];
           oneCard.suit = suits[j];
           oneCard.id = 'card' + cardCount;
           cardDesk.push(oneCard);
        }
    }
    return cardDesk;
};

const cardDesk = makeCards();

class App extends Component {
    state = {
        cards: []
    };

    changeCards = () => {
        let cardDesckCopy = [...cardDesk];
        let cards = [...this.state.cards];
        let cardIndex = 0;

        for (let i = 0; i < 5; i++){
            cardIndex = Math.floor(Math.random() * (cardDesckCopy.length));
            cards[i] = cardDesckCopy[cardIndex];
            cardDesckCopy.splice(cardIndex, 1);
        }

        this.setState({cards});
    };


    render() {
        return (
            <div className="App">
                <button className="btn" onClick={this.changeCards}>Shuffle cards</button>
                <div className="playingCards"> {
                    this.state.cards.map((card) => {
                        return <Card
                            key={card.id}
                            suit={card.suit}
                            rank={card.rank}>
                        </Card>
                    })
                }
                </div>
            </div>

        );
    }
}

export default App;
