type Props = {
    onClick: () => void;
    disabled: boolean;
  };
  
  export default function LoadMoreButton({ onClick, disabled }: Props) {
    return (
      <div className="text-center mt-6">
        <button onClick={onClick} disabled={disabled} className=" bg-black cursor-pointer rounded-lg text-white py-2 px-3 ">
          Load More
        </button>
      </div>
    );
  }
  