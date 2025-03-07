
import FeedbackReview from "../FeedbackReview/FeedbackReview";
import FeedbackText from "../FeedbackText/FeedbackText";

const Feedback = () => {
  return (
    <div className="items-center text-center py-20">
      <h2 className="text-7xl font-serif text-secondary ">FEEDBACKS</h2>
      <FeedbackReview />
      <div className="flex justify-center flex-row items-center">
        <FeedbackText />
         
      </div>
      
      
    </div>
  );
};

export default Feedback;