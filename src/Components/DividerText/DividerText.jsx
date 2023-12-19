const DividerText = ({ children }) => {
  return (
    <>
      <div class=" flex py-5 items-center">
        <div class="flex-grow  h-0.5  ml-8 mr-2   bg-black "></div>
        <span class="flex-shrink  text-[25px] text-black">{children}</span>
        <div class="flex-grow  h-0.5  ml-2 mr-8   bg-black "></div>
      </div>
      
    </>
  );
};

export default DividerText;

