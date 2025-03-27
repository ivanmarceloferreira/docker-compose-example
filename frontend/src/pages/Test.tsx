const Test = () => {
  return (
    <div>
      <div className="bg-stone-300 p-8 flex gap-8">
        <div className="bg-white rounded-md flex flex-col max-w-[300px] border border-black  h-full">
          <div className="bg-lime-200 w-full py-1 px-2 rounded-t-md font-extralight">
            {" "}
            Free Course
          </div>
          <div className="flex flex-col justify-start items-start pl-2 pr-14 pt-8">
            <h2 className="text-3xl font-semibold pb-2">Learn CSS</h2>
            <span>
              In this CSS tutorial, you’ll learn how to add CSS to visually
              transform HTML into eye-catching sites.
            </span>
          </div>
          <div className="px-2 pt-20">
            <div className="border-t border-dashed border-gray-400 py-2 text-sm flex justify-between">
              <div>
                <b>Begginer</b> Friendly
              </div>
              6hrs
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md flex flex-col max-w-[300px] border border-black  h-full">
          <div className="bg-violet-200 w-full py-1 px-2 rounded-t-md font-extralight">
            {" "}
            Free Course
          </div>
          <div className="flex flex-col justify-start items-start pl-2 pr-14 pt-8">
            <h2 className="text-3xl font-semibold pb-2">Applying Flex</h2>
            <span>
              In this CSS tutorial, you’ll learn how to add CSS to visually
              transform HTML into eye-catching sites.
            </span>
          </div>
          <div className="px-2 pt-20">
            <div className="border-t border-dashed border-gray-400 py-2 text-sm flex justify-between">
              <div>
                <b>Begginer</b> Friendly
              </div>
              6hrs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
