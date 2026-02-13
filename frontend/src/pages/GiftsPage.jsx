import React, { useEffect, useState } from "react";
import { GiftCard } from "../components/molecules/GiftCard";
import { FetchGiftCatalog } from "../service/UtilsService";

const GiftsPage = () => {
  const [catalog, setCatalog] = useState([]);

  const handleFetchCatalog = async () => {
    try {
      const response = await FetchGiftCatalog();
      setCatalog(response);
      console.log("Catálogo de presentes: ", response);
    } catch (error) {
      console.error("Erro ao buscar catálogo de presentes!");
    }
  };

  useEffect(() => {
    handleFetchCatalog();
  }, []);

  return (
    <div className="w-8/10 border-red relative grid grid-cols-3 items-center gap-4">
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
