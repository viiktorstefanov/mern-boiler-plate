import React from "react";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { RootState } from "../../state/store";

const Loader: React.FC = () => {

    const authStatus = useSelector((state: RootState) => state.auth.status);

    const isLoading = authStatus === 'loading';

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
