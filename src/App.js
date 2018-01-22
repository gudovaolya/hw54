import React, { Component } from 'react';
import './App.css';
import Card from "./Card/Card";
import WinCalculator from "./WinCalculator";

const makeCards = () => {

    let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let suits = ['D', 'H', 'S', 'C'];
    let cardDesk = [];

    for (let i = 0; i < ranks.length; i++){
        for (let j = 0; j < suits.length; j++){
           let oneCard = {};
           oneCard.rank = ranks[i];
           oneCard.suit = suits[j];
           cardDesk.push(oneCard);
        }
    }
    return cardDesk;
};

const cardDesk = makeCards();

class App extends Component {
    state = {
        cards: [],
        outcome: ''
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

        // Комбинации карт для проверки - т.к. тесты не запустились
        // royal flush
        // let cards = [
        //     {suit: 'H', rank: 'A'},
        //     {suit: 'C', rank: 'K'},
        //     {suit: 'H', rank: '10'},
        //     {suit: 'H', rank: 'Q'},
        //     {suit: 'H', rank: 'J'}
        // ]

        // straight_flush
        // let cards = [
        //     {suit: 'H', rank: '9'},
        //     {suit: 'H', rank: '8'},
        //     {suit: 'H', rank: '10'},
        //     {suit: 'H', rank: 'Q'},
        //     {suit: 'H', rank: 'J'}
        // ]

        // flush
        // let cards = [
        //     {suit: 'H', rank: '2'},
        //     {suit: 'H', rank: '5'},
        //     {suit: 'H', rank: '10'},
        //     {suit: 'H', rank: '6'},
        //     {suit: 'H', rank: 'J'}
        // ]

        //Srtaight
        // let cards = [
        //     {suit: 'S', rank: '9'},
        //     {suit: 'H', rank: '8'},
        //     {suit: 'C', rank: '10'},
        //     {suit: 'H', rank: 'Q'},
        //     {suit: 'H', rank: 'J'}
        // ]

        // let cards = [
        //     {suit: 'H', rank: '2'},
        //     {suit: 'C', rank: '3'},
        //     {suit: 'H', rank: '4'},
        //     {suit: 'S', rank: '5'},
        //     {suit: 'H', rank: 'A'}
        // ]

        //Four of a kind
        // let cards = [
        //     {suit: 'H', rank: '9'},
        //     {suit: 'C', rank: '9'},
        //     {suit: 'S', rank: '9'},
        //     {suit: 'D', rank: '9'},
        //     {suit: 'H', rank: 'J'}
        // ]

        //Full house
        // let cards = [
        //     {suit: 'H', rank: '9'},
        //     {suit: 'C', rank: '9'},
        //     {suit: 'S', rank: '9'},
        //     {suit: 'D', rank: 'K'},
        //     {suit: 'H', rank: 'K'}
        // ]

        //Three of a kind
        // let cards = [
        //     {suit: 'H', rank: '9'},
        //     {suit: 'C', rank: '9'},
        //     {suit: 'S', rank: '9'},
        //     {suit: 'D', rank: 'K'},
        //     {suit: 'H', rank: 'J'}
        // ]

        //two pairs
        // let cards = [
        //     {suit: 'H', rank: '9'},
        //     {suit: 'C', rank: '9'},
        //     {suit: 'S', rank: 'A'},
        //     {suit: 'D', rank: '7'},
        //     {suit: 'H', rank: '7'}
        // ]

        //one pairs
        // let cards = [
        //     {suit: 'H', rank: '9'},
        //     {suit: 'C', rank: '9'},
        //     {suit: 'S', rank: 'A'},
        //     {suit: 'D', rank: '4'},
        //     {suit: 'H', rank: '2'}
        // ]

        const calc = new WinCalculator(cards);
        const outcome = calc.getOutcome();

        this.setState({cards, outcome});
    };

    render() {
        return (
            <div className="App">
                <button className="btn" onClick={this.changeCards}>Shuffle cards</button>
                <div className="playingCards"> {
                    this.state.cards.map((card, index) => {
                        return <Card
                            key={index}
                            suit={card.suit}
                            rank={card.rank}>
                        </Card>
                    })
                }
                </div>
                <div className="outcome">{this.state.outcome}</div>
            </div>

        );
    }
}

export default App;
