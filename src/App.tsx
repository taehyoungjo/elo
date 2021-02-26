import React, { useEffect, useState } from "react";
import _ from "lodash";
import Comparison from "./components/Comparison";
import "./App.css";

interface Card {
  score: number;
  text: string;
  comparisonCount: number;
}

function App() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState<Array<Card>>([]);
  const [comparison, setComparison] = useState<{
    leftCard: Card;
    rightCard: Card;
    leftIndex: number;
    rightIndex: number;
  } | null>(null);
  const [showCards, setShowCards] = useState(true);

  useEffect(() => {
    if (cards.length < 2) {
      return;
    }

    // Super naive
    let arr = [];
    while (arr.length < 2) {
      let r = Math.floor(Math.random() * cards.length);
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    // Get two indices
    const { leftIndex, rightIndex } = { leftIndex: arr[0], rightIndex: arr[1] };

    // Set comparison
    setComparison({
      leftCard: cards[leftIndex],
      rightCard: cards[rightIndex],
      leftIndex: leftIndex,
      rightIndex: rightIndex,
    });
  }, [cards]);

  const eloTwoItems = (leftWon: boolean) => {
    const K = 100;

    // Calculate elo stuff
    if (comparison) {
      const p1 =
        1.0 /
        (1.0 +
          10 **
            ((comparison.rightCard.score - comparison.leftCard.score) / 400));
      const p2 =
        1.0 /
        (1.0 +
          10 **
            ((comparison.leftCard.score - comparison.rightCard.score) / 400));

      const newLeftScore =
        comparison.leftCard.score + K * ((leftWon ? 1 : 0) - p1);
      const newRightScore =
        comparison.rightCard.score + K * ((leftWon ? 0 : 1) - p2);

      let newCards = cards;
      newCards[comparison.leftIndex] = {
        ...cards[comparison.leftIndex],
        score: newLeftScore,
      };
      newCards[comparison.rightIndex] = {
        ...cards[comparison.rightIndex],
        score: newRightScore,
      };
      setCards([...newCards]);
    }
  };

  return (
    <div className="flex flex-col w-screen items-center">
      <h1 className="text-2xl text-gray-700">Elo ⚖️</h1>
      {cards.length < 2 ? (
        <div>Add more cards</div>
      ) : (
        <Comparison comparison={comparison} eloTwoItems={eloTwoItems} />
      )}
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();

          setCards([{ score: 1000, text: text, comparisonCount: 0 }, ...cards]);
          setText("");
        }}
      >
        <input
          className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border border-gray-300 focus:ring-2 focus:ring-gray-300"
          placeholder="New card"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </form>

      <button
        onClick={(e) => {
          e.preventDefault();
          setShowCards(!showCards);
        }}
      >
        {showCards ? "Hide" : "Show"}
      </button>
      {showCards && (
        <div className="w-full flex flex-col items-center">
          {cards
            .sort((a, b) => b.score - a.score)
            .map((card, index) => (
              <div
                key={index}
                className="py-2 border-b-2 border-gray-200 w-full flex justify-between items-baseline"
              >
                <h2 className="text-gray-700">{index}</h2>
                <h2 className="text-gray-700">{card.text}</h2>
                <h2 className="text-gray-700">{card.score}</h2>
                <button
                  className="px-2 py-1 rounded-md bg-gray-50 text-gray-600"
                  onClick={(e) => {
                    e.preventDefault();
                    let newCards = cards;
                    _.pullAt(newCards, [index]);
                    setCards([...newCards]);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
