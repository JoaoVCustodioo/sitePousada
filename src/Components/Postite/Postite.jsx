const Postite = ({ children }) => {
  return (
    <>
      <div className=" shadow-2xl border-8 border-dimwhite m-10 b- p-5 w-4/5 h-fit flex items-center bg-primary text-center text-black text-[16px] font-normal">
        {children}
      </div>
    </>
  );
};

export default Postite;
