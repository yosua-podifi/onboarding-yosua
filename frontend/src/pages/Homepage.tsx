import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import NotificationMsg from "../components/NotificationMsg";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import { MenuDTO } from "../../../backend/src/shared/types";
import { useNotificationStore } from "../store/notificationStore";

const Homepage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuDTO>();
  const { type, setType } = useNotificationStore();

  const onButtonContainerClick = useCallback(() => {
    navigate("/view-order");
  }, [navigate]);

  const onItemCardContainerClick = useCallback(
    (menuItemId: string) => {
      navigate(`/item-detail/${menuItemId}`);
    },
    [navigate]
  );

  const onRefreshButtonFrameIconClick = useCallback(() => {
    setType("");
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL! + "/menu/active"
      );

      setMenu(res.data);
    } catch (error) {
      setType("No Menu");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="relative bg-white w-full h-[1024px] flex flex-col items-start justify-start">
      <main className="self-stretch bg-white flex flex-col items-start justify-start py-[43px] px-5 gap-[20px]">
        <header className="self-stretch flex flex-row items-start justify-start gap-[36px] text-left text-13xl text-gray-100 font-aleo sm:flex-row sm:gap-[1px] sm:items-start sm:justify-start">
          <div className="flex flex-row items-start justify-between">
            <b className="relative">
              <span className="capitalize">{menu?.type} </span> Time Menu
            </b>
          </div>
          <img
            className="relative w-[37px] h-[37px] overflow-hidden shrink-0 object-cover cursor-pointer"
            alt=""
            src="/refreshbuttonframe@2x.png"
            onClick={onRefreshButtonFrameIconClick}
          />
          <div className="self-stretch flex-1 flex flex-col items-end justify-start py-0.5 px-3.5">
            <Button
              buttonText="View Order"
              onButtonContainerClick={onButtonContainerClick}
              buttonMinWidth="unset"
            />
          </div>
        </header>
        <div className="self-stretch flex flex-col items-start justify-start">
          <img
            className="self-stretch relative max-w-full overflow-hidden h-0.5 shrink-0 object-cover"
            alt=""
            src="/separator@2x.png"
          />
        </div>
        {type === "No Menu" && (
          <NotificationMsg
            notificationIconFrame="/notificationiconframe@2x.png"
            notificationMainMessage="Nothing currently listed as available, please refresh menu"
            notificationBackgroundColor="#FFEEAA"
          />
        )}

        {type === "Item Added" && (
          <NotificationMsg
            notificationIconFrame="/notificationiconsuccess.png"
            notificationMainMessage="Order successfully placed"
          />
        )}

        {type === "Order Placed" && (
          <NotificationMsg
            notificationIconFrame="/notificationiconsuccess.png"
            notificationMainMessage="Order successfully placed"
          />
        )}

        <section className="self-stretch flex flex-row flex-wrap items-start justify-start py-6 px-px gap-[30px]">
          {menu?.menuItems.map((item) => (
            <ItemCard
              key={item.menuItemId}
              menuItemCode={item.imageUrl}
              itemName={item.name}
              itemPrice={`$${item.price}`}
              itemCardItemImageFrameWidth="238px"
              itemCardItemImageIconWidth="unset"
              itemCardItemImageIconAlignSelf="stretch"
              itemCardItemImageIconOverflow="hidden"
              onItemCardContainerClick={() =>
                onItemCardContainerClick(item.menuItemId)
              }
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Homepage;
