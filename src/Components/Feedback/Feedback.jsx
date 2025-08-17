import FeedbackReview from "../FeedbackReview/FeedbackReview";
import FeedbackText from "../FeedbackText/FeedbackText";

const Feedback = () => {
  return (
    <div className="items-center text-center py-20 px-2">
      <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif text-secondary break-words" data-aos="fade-up">
        FEEDBACKS
      </h2>
      <div data-aos="fade-up" data-aos-delay="200">
        <FeedbackReview />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <FeedbackText />
      </div>
    </div>
  );
};

export default Feedback;