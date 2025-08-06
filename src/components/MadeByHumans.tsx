import React from "react";
const MadeByHumans = () => {
  return <section id="made-by-humans" className="w-full bg-white py-4 flex justify-center">
      <div className="max-w-md w-full mx-auto px-4 opacity-0 animate-on-scroll">
        {/* Removed the pulse-chip button/element that was here */}
        
        <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden relative">
          <div className="relative p-3 sm:p-4 min-h-[180px] sm:min-h-[220px] flex flex-col justify-between bg-gradient-to-br from-gray-900 via-blue-950 to-black border border-gray-700/50 overflow-hidden" style={{
          backdropFilter: "blur(1px)"
        }}>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-40"></div>
            <div className="absolute inset-0 shadow-inner"></div>
            
            <div className="relative z-10 flex items-center text-white">
              
              <span className="text-white text-xl font-medium">
            </span>
            </div>
            
            <div className="relative z-10" style={{
            overflow: "hidden",
            maxHeight: "80px",
            marginTop: "40px"
          }}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-playfair text-white italic font-thin text-center drop-shadow-lg">
                Made by OceanAI
              </h2>
            </div>
            
            {/* White box at the bottom with overflow */}
            <div className="w-full bg-gradient-to-br from-gray-900 via-blue-950 to-black h-10 rounded-t-lg absolute left-0 bottom-0 border-t border-gray-700/50" style={{
            backdropFilter: "blur(1px)"
          }}>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-40"></div>
              <div className="absolute inset-0 shadow-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default MadeByHumans;