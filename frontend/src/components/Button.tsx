import { FunctionComponent, memo, useMemo, type CSSProperties } from "react";

type ButtonType = {
  buttonText?: string;

  /** Style props */
  buttonMinWidth?: CSSProperties["minWidth"];
  disabled?: boolean;

  /** Action props */
  onButtonContainerClick?: () => void;
};

const Button: FunctionComponent<ButtonType> = memo(
  ({
    buttonText = "View Orders",
    onButtonContainerClick,
    buttonMinWidth,
    disabled,
  }) => {
    const buttonStyle: CSSProperties = useMemo(() => {
      return {
        minWidth: buttonMinWidth,
      };
    }, [buttonMinWidth]);

    return (
      <button
        className="bg-gray-100 flex flex-col items-start justify-start py-2.5 px-[15px] text-sm text-white font-aleo border-[1px] border-solid border-black cursor-pointer text-center disabled:bg-gray-200 disabled:cursor-not-allowed"
        onClick={onButtonContainerClick}
        style={buttonStyle}
        disabled={disabled}
      >
        <div className="relative w-full">{buttonText}</div>
      </button>
    );
  }
);

export default Button;
