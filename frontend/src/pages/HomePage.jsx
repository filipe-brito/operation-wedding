import { HeaartIcon } from "../components/atoms/Icons";
import { CountdownTimer } from "../components/molecules/CountdownTimer";

const Home = () => {
  return (
    <div className="w-full relative flex flex-col items-center text-[#7E8C54] md:mt-10 mt-18">
      <section className="flex flex-col items-center text-3xl gap-4 mb-10">
        <div className="relative flex flex-col justify-center items-center">
          <HeaartIcon className="text-[#E2725B]/70 h-50 w-50 animate-heartbeat animate-duration-1000 animate-iteration-count-infinite" />
          <h1 className="absolute text-center font-[GreatVibes] text-8xl">
            Amanda
            <br className="md:hidden" />
            <span className="text-4xl">&</span> Filipe
          </h1>
        </div>

        <img src="/main_logo.svg" alt="Logo Principal" className="h-12 w-12" />
        <h2 className="font-[MarcellusSC]">18 / 10 / 2026</h2>
      </section>
      <section className="w-full flex flex-col items-center">
        <h2 className="font-[GreatVibes] text-2xl mb-6 text-[#7E8C54] text-nowrap">
          Contagem Regressiva para o Grande Dia
        </h2>
        <CountdownTimer />
      </section>
    </div>
  );
};

export default Home;
