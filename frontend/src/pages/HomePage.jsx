import { CountdownTimer } from "../components/molecules/CountdownTimer";

const Home = () => {
  return (
    <div className="w-full relative flex flex-col items-center">
      <section className="w-full flex flex-col items-center">
        <h2 className="font-marcellus text-2xl mb-6 text-[#63461a]">
          Contagem Regressiva para o Grande Dia
        </h2>
        <CountdownTimer />
      </section>
    </div>
  );
};

export default Home;
