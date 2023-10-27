const InitialHomeDesign = () => {
  return (
    <>
      <div className="curved-bottom top-0 cols-center ">
        <div className="self-center">
          <p className="text-white text-5xl italic font-bold font-serif text-center">
            Welcome to the Vihiga Intranet System
          </p>
        </div>
      </div>
      <div className=" m-4 p-4 border row justify-around  space-x-5">
        {state.map((data, index) => (
          <LinkScroll
            activeClass="active"
            to={data.link}
            smooth={true}
            offset={50}
            duration={500}
            // onSetActive={}
            // onClick={() => navigate(data.link)}
            key={index}
            className="cols-center p-2 m-2 hover:bg-gray-100/20 hover:scale-110 rounded-xl  "
          >
            <div className=" h-[7vw] w-[7vw] p-2 cols-center rounded-full bg-primary/30">
              {data.icon()}
            </div>
            <p className="my-2">{data.text}</p>
          </LinkScroll>
        ))}
      </div>
    </>
  );
};

{
  "0700270707", "105781537M000269", "357777960425280";
}
// Networks and Internet
// Mobile Plan