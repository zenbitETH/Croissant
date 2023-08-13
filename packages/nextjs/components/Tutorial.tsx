// import React, { useState } from "react";

//import Image from 'next/image';

// interface Section {
//   id: number;
//   title: string;
// }

// const sections: Section[] = [
//   { id: 1, title: "Youtube Video" },
//   { id: 2, title: "Additional Info" },
// ];

const Tutorial: React.FC = () => {
  // const [activeSection, setActiveSection] = useState<Section>(sections[0]);

  // const goToPrevious = () => {
  //   const currentIndex = sections.findIndex(section => section.id === activeSection.id);
  //   if (currentIndex > 0) {
  //     setActiveSection(sections[currentIndex - 1]);
  //   }
  // };

  // const goToNext = () => {
  //   const currentIndex = sections.findIndex(section => section.id === activeSection.id);
  //   if (currentIndex < sections.length - 1) {
  //     setActiveSection(sections[currentIndex + 1]);
  //   }
  // };

  return (
    <div className="overflow-hidden text-center h-screen grid items-center  relative">
      {/* {activeSection.id === 1 && ( */}
      <div className="md:mx-32 gap-3 pt-32 pb-36 font-bau h-full grid items-center px-3">
        <iframe
          className="w-full h-full rounded-2xl"
          src="https://www.youtube.com/embed/Mwr3eJgp4_M"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        />
      </div>
      {/* )} */}
      {/*{activeSection.id === 2 && (
        <div className="mx-20 pt-10 pb-36 gap-5 h-full grid items-center  text-white font-exo overflow-y-auto hide-scrollbar">
          <div className="bg-black/20 rounded-dd h-full p-5 ">
            <div className="text-sm md:text-base text-justify">hello1 </div>
          </div>
        </div>
      )}
      <button className="carBT left-3" onClick={goToPrevious}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
          {" "}
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />{" "}
        </svg>
      </button>
      <button className="carBT right-3" onClick={goToNext}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
          {" "}
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />{" "}
        </svg>
      </button> */}
      {/* <div className="homeBT mx-auto fixed left-1/2 -translate-x-1/2 fixed bottom-6 ">Ready for the Quiz</div> */}
    </div>
  );
};

export default Tutorial;
