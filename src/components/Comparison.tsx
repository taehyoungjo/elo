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
  eloTwoItems: (leftWon: boolean) => any;
}) => {
  const { comparison, eloTwoItems } = props;
  return (
    <div className="flex">
      <button
        onClick={(e) => {
          e.preventDefault();
          if (comparison) {
            eloTwoItems(true);
          }
        }}
      >
        {comparison?.leftCard.text}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (comparison) {
            eloTwoItems(false);
          }
        }}
      >
        {comparison?.rightCard.text}
      </button>
    </div>
  );
};

export default Comparison;
