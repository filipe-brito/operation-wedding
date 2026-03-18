import { useEffect, useState } from "react";
import { GiftCard } from "../components/molecules/GiftCard";
import { FetchGiftCatalog } from "../service/UtilsService";
import { useLoading } from "@/context/LoadingContext";

const GiftsPage = () => {
  const { setIsLoading } = useLoading();

  const [catalog, setCatalog] = useState([]);

  const handleFetchCatalog = async () => {
    try {
      const response = await FetchGiftCatalog();
      setCatalog(response);
      console.log("Catálogo de presentes: ", response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleFetchCatalog();
  }, []);

  return (
    <div className="w-8/10 relative grid md:grid-cols-3 grid-cols-1 gap-4">
      {catalog.map((gift) => (
        <GiftCard
          key={gift.id}
          id={gift.id}
          name={gift.gift_name}
          price={gift.price}
          image={gift.image_url}
        />
      ))}
    </div>
  );
};
export default GiftsPage;
