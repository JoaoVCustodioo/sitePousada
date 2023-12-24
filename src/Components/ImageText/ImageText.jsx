

const ImageText = ({children}) => {
  return (
    <>
      <div className="w-full  lg:w-2/6 border-r-2 border-b-2 border-l-2  h-42 gap-2 flex-col">
        <p className=" text-center text-[16px] font-sans p-2 pt-5 block">{children}</p>
        <div className="flex  justify-evenly pt-2">
       
        </div>
      </div>
    </>
  );
};

export default ImageText;
