import React, {useEffect} from "react";

const FeedbackReview = () => {
    useEffect(() => {
        
        const script = document.createElement('script');
        script.src = 'https://grwapi.net/widget.min.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    
        
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
      return (
        <div className="bg-beige-100 w-full h-auto flex flex-col items-center justify-center ">
      
      <div
        className="review-widget_net w-full max-w-7xl px-4"
        data-uuid="9e5ebec9-4de0-4fd5-baec-bf0ea0cdf16f"
        data-template="2"
        data-lang="en"
        data-theme="light"
      ></div>
    </div>
      );
    };


export default FeedbackReview;

