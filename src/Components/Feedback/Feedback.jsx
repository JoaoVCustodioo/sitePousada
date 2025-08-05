import FeedbackReview from "../FeedbackReview/FeedbackReview";
import FeedbackText from "../FeedbackText/FeedbackText";

const Feedback = () => {
  return (
    <div className="items-center text-center py-20 px-2">
      <h2 className="text-6xl md:text-5xl lg:text-7xl font-serif text-secondary break-words">
        FEEDBACKS
      </h2>
      <FeedbackReview />
      <div className="flex justify-center flex-row items-center">
        <FeedbackText />
      </div>
    </div>
  );
};

export default Feedback;