import LoadingModal from "../components/atoms/LoadingModal";

const TestPage = () => {
  return (
    <>
      <LoadingModal />
      <div className="text-2xl font-bold mb-6 gap-4">
        <h1 className="text-4xl mb-4">CATÁLOGO DE FONTES</h1>
        <div className="font-[JosefinSans]">
          <h2>JosefinSans</h2>
          <p>Texto digitado em JosefinSans</p>
        </div>
        <div className="font-[GreatVibes]">
          <h2>GreatVibes</h2>
          <p>Texto digitado em GreatVibes</p>
        </div>
        <div className="font-[MarcellusSC]">
          <h2>MarcellusSC</h2>
          <p>Texto digitado em MarcellusSC</p>
        </div>
        <div className="font-[EmilysCandy]">
          <h2>EmilysCandy</h2>
          <p>Texto digitado em EmilysCandy</p>
        </div>
        <div className="font-[Oswald] font-normal">
          <h2>Oswald</h2>
          <p>Texto digitado em Oswald</p>
        </div>
        <div className="font-[Reboto] font-normal">
          <h2>Rebolto</h2>
          <p>Texto digitado em Rebolto</p>
        </div>
      </div>
    </>
  );
};

export default TestPage;
