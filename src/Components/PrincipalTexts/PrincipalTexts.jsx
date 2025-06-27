const PrincipalText = ({ children }) => {
  return (
    <div className="bg-[#ECE5DE] text-center px-4 py-8 md:py-12 lg:py-16">
      <div className="text-brown-800 text-lg md:text-xl lg:text-2xl font-serif leading-relaxed max-w-4xl mx-auto">
        {children}
      </div>
      <hr className="w-3/4 mx-auto mt-6 h-[3px] border-0 bg-gradient-to-r from-transparent via-secondary to-transparent" />


    </div>
  );
};

export default PrincipalText;
