const OUTCOMES = {
    ROYAL_FlUSH: 'Royal Flush',
    FLUSH: 'Flush',
    TWO_PAIRS: 'Two Pairs',
    PAIR: 'One Pair',
    THREE: 'Three of a kind',
    FOUR: 'Four of a kind',
    FULL_HOUSE: 'full house',
    STRAIGHT_FLUSH: 'straight flush',
    STRAIGHT: 'straight',
    NOTHING: 'Nothing'
};

const compareNumeric = (a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
};

class WinCalculator {

    constructor(cards) {
        this.cards = cards;
        this.suits = this.cards.map(card => card.suit);
        this.ranks = this.cards.map(card => card.rank);
        this.isFlush = this.suits.every(suit => suit === this.suits[0]);
    }

    isRoyalFlush() {
        return this.isFlush &&
            this.ranks.includes('10') &&
            this.ranks.includes('J') &&
            this.ranks.includes('Q') &&
            this.ranks.includes('K') &&
            this.ranks.includes('A')

    }

    isSraight_Flush() {

        const ranksInt = [];

        this.ranks.forEach(rank => {
            if(rank !== 'J' && rank !== 'Q' && rank !== 'K' && rank !== 'A') {
                ranksInt.push(parseInt(rank));
            } else if (rank ==='J') {
                ranksInt.push(11);
            } else if (rank === 'Q') {
                ranksInt.push(12);
            } else if (rank === 'K') {
                ranksInt.push(13);
            } else if (rank === 'A') {
                ranksInt.push(14);
            }
        });

        ranksInt.sort(compareNumeric);

        let sum = 0;

        if (this.isFlush) {

            for (let i = 1; i < ranksInt.length; i++ ) {
                sum += ranksInt[i] - ranksInt[i-1]
            }

            if (sum === 4) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }

    }

    isStraight() {

        let ranksInt = [];

        this.ranks.forEach(rank => {
            if(rank !== 'J' && rank !== 'Q' && rank !== 'K' && rank !== 'A') {
                ranksInt.push(parseInt(rank));
            } else if (rank === 'J') {
                ranksInt.push(11);
            } else if (rank === 'Q') {
                ranksInt.push(12);
            } else if (rank === 'K') {
                ranksInt.push(13);
            } else if (rank === 'A' && !this.ranks.includes('2')) {
                ranksInt.push(14);
            } else {
                ranksInt.unshift(1);
            }
        });

        ranksInt.sort(compareNumeric);

        let sum = 0;

        for (let i = 1; i < ranksInt.length; i++ ) {
            sum += ranksInt[i] - ranksInt[i-1];
        }

        if (sum === 4) {
            return true;
        } else {
            return false;
        }
    }

    isPairs() {
        const ranksNumber = {};
        let countPairs = 0;

        this.ranks.forEach(rank => {
            if(!ranksNumber[rank]) {
                ranksNumber[rank] = 1;
            } else {
                ranksNumber[rank]++;
            }
        });

        Object.values(ranksNumber).forEach(rankValue => {
            if (rankValue === 2) {
               countPairs++;
            }
        });

        return countPairs;
    }

    isThree() {
        const ranksNumber = {};

        this.ranks.forEach(rank => {
            if(!ranksNumber[rank]) {
                ranksNumber[rank] = 1;
            } else {
                ranksNumber[rank]++;
            }
        });

        return Object.values(ranksNumber).includes(3);
    }

    isFour() {
        const ranksNumber = {};

        this.ranks.forEach(rank => {
            if(!ranksNumber[rank]) {
                ranksNumber[rank] = 1;
            } else {
                ranksNumber[rank]++;
            }
        });

        return Object.values(ranksNumber).includes(4);
    }

    getOutcome() {

        if (this.isRoyalFlush()) {
            return OUTCOMES.ROYAL_FlUSH;
        } else if (this.isSraight_Flush()) {
            return OUTCOMES.STRAIGHT_FLUSH;
        } else if (this.isFlush) {
            return OUTCOMES.FLUSH;
        } else if (this.isFour()) {
            return OUTCOMES.FOUR;
        } else if (this.isThree() && this.isPairs() === 1) {
            return OUTCOMES.FULL_HOUSE;
        } else if (this.isThree()) {
            return OUTCOMES.THREE;
        } else if (this.isPairs() === 2) {
            return OUTCOMES.TWO_PAIRS;
        } else if (this.isPairs() === 1) {
            return OUTCOMES.PAIR;
        } else if (this.isStraight()) {
            return OUTCOMES.STRAIGHT;
        } else {
           return OUTCOMES.NOTHING;
        }
    }
}

export default WinCalculator;