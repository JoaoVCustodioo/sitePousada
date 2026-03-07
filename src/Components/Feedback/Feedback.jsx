import FeedbackReview from "../FeedbackReview/FeedbackReview";
import FeedbackText from "../FeedbackText/FeedbackText";

const Feedback = () => {
  return (
    <div className="bg-dimwhite py-20 px-4 md:px-8 w-full border-t border-b border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h4 className="text-secondary font-sans font-medium tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Depoimentos
        </h4>
        <h2 className="text-3xl md:text-5xl font-sans font-light text-dark mb-12" data-aos="fade-up" data-aos-delay="100">
          O que nossos hóspedes dizem
        </h2>

        <div className="w-full mb-16" data-aos="fade-up" data-aos-delay="200">
          <FeedbackReview />
        </div>

        <div className="w-full" data-aos="fade-up" data-aos-delay="300">
          <FeedbackText />
        </div>
      </div>
    </div>
  );
};

export default Feedback;