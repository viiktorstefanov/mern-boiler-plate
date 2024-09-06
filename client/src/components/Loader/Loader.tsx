import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loader: React.FC = () => {

    const isLoading = false;

  return (
    <>
      {isLoading && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-[100000000]'>
          <PulseLoader
            className="absolute flex justify-center items-center"
            color={"#03a1fc"}
            loading={true}
            aria-label="Loading"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
};

export default Loader;
