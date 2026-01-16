import { GiftCard } from "../components/molecules/GiftCard";

const GiftsPage = () => {
  return (
    <div className="w-8/10 border-red relative grid grid-cols-3 items-center gap-4">
      <GiftCard
        id="1"
        name="Tratamento para cabelo do noivo"
        price={1000}
        image="https://res.cloudinary.com/dnqhyvodt/image/upload/v1768223494/tratamento-capilar-noivo_yuxegx.jpg"
      />
      <GiftCard
        id="2"
        name="Cota para Lua de Mel"
        price={200}
        image="https://res.cloudinary.com/dnqhyvodt/image/upload/v1768224002/lua-de-mel_n94cdq.jpg"
      />

      <GiftCard
        id="3"
        name="Jantar dos Noivos"
        price={150}
        image="https://res.cloudinary.com/dnqhyvodt/image/upload/v1768223494/jantar-noivos_twevjv.jpg"
      />
    </div>
  );
};
export default GiftsPage;
