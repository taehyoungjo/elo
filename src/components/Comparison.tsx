import React, { useEffect, useRef } from "react";

interface Card {
  score: number;
  text: string;
  comparisonCount: number;
}

const Comparison = (props: {
  comparison: {
    leftCard: Card;
    rightCard: Card;
    leftIndex: number;
    rightIndex: number;
  } | null;
  eloTwoItems: (
    leftWon: boolean,
    comparison: {
      leftCard: Card;
      rightCard: Card;
      leftIndex: number;
      rightIndex: number;
    } | null
  ) => any;
}) => {
  const { comparison, eloTwoItems } = props;
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);

  const keydownHandler = (
    comparison: {
      leftCard: Card;
      rightCard: Card;
      leftIndex: number;
      rightIndex: number;
    } | null
  ) => (e: any) => {
    if (e.keyCode === 37 && e.ctrlKey) {
      leftRef.current?.focus();
      eloTwoItems(true, comparison);
      setTimeout(() => leftRef.current?.blur(), 200);
    } else if (e.keyCode === 39 && e.ctrlKey) {
      rightRef.current?.focus();
      eloTwoItems(false, comparison);
      setTimeout(() => rightRef.current?.blur(), 200);
    }
  };

  useEffect(() => {
    const auxKeyDownHandler = keydownHandler(comparison);
    document.addEventListener("keydown", auxKeyDownHandler);
    return () => {
      document.removeEventListener("keydown", auxKeyDownHandler);
    };
  });

  return (
    <div className="w-full flex space-x-4 justify-center">
      <button
        ref={leftRef}
        className="px-12 py-6 rounded-lg bg-gray-50 shadow-md border border-gray-300 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none text-gray-700 flex flex-col items-center space-y-2"
        onClick={(e) => {
          e.preventDefault();
          if (comparison) {
            eloTwoItems(true, comparison);
          }
        }}
      >
        <kbd className="min-w-max bg-white border-gray-300 border border-b-4	px-2 py-1 rounded-md">
          Ctrl + ←
        </kbd>
        <h2>{comparison?.leftCard.text}</h2>
      </button>
      <button
        ref={rightRef}
        className="px-12 py-6 rounded-lg bg-gray-50 shadow-md border border-gray-300 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none text-gray-700 flex flex-col items-center space-y-2"
        onClick={(e) => {
          e.preventDefault();
          if (comparison) {
            eloTwoItems(false, comparison);
          }
        }}
      >
        <kbd className="min-w-max bg-white border-gray-300 border border-b-4 px-2 py-1 rounded-md">
          Ctrl + →
        </kbd>
        <h2>{comparison?.rightCard.text}</h2>
      </button>
    </div>
  );
};

export default Comparison;
