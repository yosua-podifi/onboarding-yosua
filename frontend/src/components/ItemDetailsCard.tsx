import { FunctionComponent, useState } from "react";
import { Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

type ItemDetailsCardType = {
  itemDetailsCardItemImage?: string;
  itemDetailsCardItemName?: string;
  itemDetailsCardItemPrice?: number;
  itemDetailsCardItemDescription?: string;
  menuItemId?: string;
  addToOrder: (menuItemId: string, quantity: number) => void;
};

const ItemDetailsCard: FunctionComponent<ItemDetailsCardType> = ({
  itemDetailsCardItemImage,
  itemDetailsCardItemName,
  itemDetailsCardItemPrice,
  itemDetailsCardItemDescription,
  addToOrder,
  menuItemId,
}) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const onButtonContainerClick = () => {
    addToOrder(menuItemId!, quantity);
    navigate("/homepage");
  };

  return (
    <div className="bg-white flex flex-row items-start justify-start gap-[41px] text-left text-3xl text-gray-300 font-aleo sm:flex-col sm:gap-[41px] sm:items-center sm:justify-start">
      <img
        className="relative w-[238px] h-[227px] object-cover sm:flex"
        alt=""
        src={itemDetailsCardItemImage}
      />
      <div className="self-stretch flex flex-col items-start justify-start gap-[10px] sm:items-start sm:justify-start">
        <div className="flex-1 flex flex-row items-center justify-start gap-[50px] sm:flex-col">
          <div className="flex flex-col items-start justify-start gap-[5px] md:flex-col md:gap-[15px] md:pb-0 md:box-border sm:flex-col sm:items-center sm:justify-start">
            <div className="flex flex-row items-start justify-start md:h-auto md:flex-row sm:flex-col">
              <b className="relative">{itemDetailsCardItemName}</b>
            </div>
            <div className="flex flex-col items-start justify-start text-base md:flex-row">
              <b className="relative">${itemDetailsCardItemPrice}</b>
            </div>
          </div>
          <div className="w-[539px] flex flex-row items-start justify-start text-base sm:w-auto sm:[align-self:unset]">
            <div className="flex-1 relative sm:flex">
              {itemDetailsCardItemDescription}
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-end gap-[50px] sm:flex-col sm:gap-[20px] sm:items-end sm:justify-start">
          <div className="flex flex-row items-center justify-start gap-[10px]">
            <img
              className="relative rounded-10xs w-[23px] h-[23px] object-cover cursor-pointer"
              alt="increment quantity"
              src="/itemdetailscardincrementquantityframe@2x.png"
              onClick={() => setQuantity(quantity + 1)}
            />
            <Input
              className="bg-[transparent] font-aleo font-bold text-base text-gray-100"
              placeholder={quantity.toString()}
              size="sm"
              type="number"
              data-testid="quantity-input"
            />
            <img
              className="relative rounded-10xs w-[23px] h-[23px] object-cover cursor-pointer"
              alt="decrement quantity"
              src="/itemdetailscarddecrementquantityframe@2x.png"
              onClick={() => {
                if (quantity <= 1) {
                  return;
                }
                setQuantity(quantity - 1);
              }}
            />
          </div>
          <Button
            buttonText="Add To Order"
            onButtonContainerClick={onButtonContainerClick}
            buttonMinWidth="unset"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsCard;
