import { useState } from "react";

export const MenuButton = ({ switcher, setSwitcher, isOnTop }) => {
  const spanIdleStyle = "h-[0.125rem] w-full rounded-full shadow-sm bg-white";

  return (
    <div
      className={`group flex size-12 items-center justify-center rounded-2xl transition duration-600 ${isOnTop ? "border border-none" : "border border-white bg-black/10"}`}
    >
      <button
        className="flex size-8 flex-col justify-between p-1 group-hover:cursor-pointer transition duration-300 group-hover:scale-110"
        onClick={() => setSwitcher(!switcher)}
      >
        <span
          className={`${spanIdleStyle} ${switcher ? "transition duration-400 translate-y-[11px] rotate-[-45deg]" : "transition-all duration-400 translate-y-[0px] rotate-[0deg]"}`}
        ></span>
        <span
          className={`${spanIdleStyle} ${switcher ? "transition duration-400 translate-x-[-10px] opacity-0" : "transition-all duration-400 translate-x-[0px] opacity-100 "}`}
        ></span>
        <span
          className={`${spanIdleStyle} ${switcher ? "transition duration-400 translate-y-[-11px] rotate-[45deg]" : "transition-all duration-400 translate-y-[0px] rotate-[0deg]"}`}
        ></span>
      </button>
    </div>
  );
};
