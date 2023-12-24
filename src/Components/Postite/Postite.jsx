const Postite = ({ children }) => {
  return (
    <>
      <div className=" shadow-2xl border-8 border-dimwhite m-10  p-5 w-4/5 h-fit flex items-center bg-primary text-center text-black text-[16px] font-normal lg:w-2/6">
        {children}
      </div>
    </>
  );
};

export default Postite;
