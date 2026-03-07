const PrincipalText = ({ children }) => {
  return (
    <div className="bg-primary text-center px-6 md:px-12 py-16 md:py-24 w-full">
      <div className="text-dark text-lg md:text-2xl lg:text-3xl font-sans font-light leading-relaxed max-w-4xl mx-auto">
        {children}
      </div>
      <hr className="w-24 mx-auto mt-12 h-[2px] border-0 bg-secondary/60" />
    </div>
  );
};

export default PrincipalText;
