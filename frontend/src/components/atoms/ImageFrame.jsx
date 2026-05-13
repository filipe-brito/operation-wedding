export const ImageFrame = ({ image, className }) => {
  return (
    <div
      className={`relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className || ""}`}
    >
      <div className="absolute z-1 top-0 film-strip-container overflow-x-hidden opacity-30">
        <img src="/film.svg" alt="" className=" animate-film-roll w-full" />
        <img src="/film.svg" alt="" className="animate-film-roll w-full" />
      </div>
      {image}
      <div className="absolute z-1 bottom-0 film-strip-container overflow-x-hidden opacity-30">
        <img src="/film.svg" alt="" className="animate-film-roll w-full" />
        <img src="/film.svg" alt="" className="animate-film-roll w-full" />
      </div>
    </div>
  );
};

export const ImageFrame2 = ({ image, className }) => {
  return (
    <div
      className={`relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className || ""}`}
    >
      <img
        src="/scratched-texture-up-part.svg"
        alt=""
        className="absolute top-0 w-full z-1"
      />
      {image}
      <img
        src="/scratched-texture-down-part.svg"
        alt=""
        className="absolute bottom-0 w-full z-1"
      />
    </div>
  );
};

export const ImageFrame3 = ({ image, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="420"
      height="420"
      viewBox="0 0 420 420"
      fill="none"
      {...props}
    >
      <g id="polaroid">
        <path fill="#fff" d="M0 0h420v420H0z" />
        <g id="Clip path group">
          <mask
            id="mask0_94_2"
            width="52"
            height="46"
            x="118"
            y="355"
            maskUnits="userSpaceOnUse"
          >
            <g id="b4e7303ffd">
              <path
                id="Vector"
                fill="#fff"
                d="M118.27 355.66h50.94v44.72h-50.94z"
              />
            </g>
          </mask>
          <g mask="url(#mask0_94_2)">
            <g id="Group">
              <path
                id="Vector_2"
                fill="#000"
                d="M169.19 368.22c-.27-6.33-6.4-11.56-12.63-10.81-4.4.53-7.72 2.93-10.51 6.16-1.19 1.35-2.13 2.9-3.2 4.4l-.63-1.24c-1.57-3.2-3.48-6.13-6.3-8.4-6.94-5.56-15.41-1.88-17.24 5.74-.95 3.95-.15 7.73 1.65 11.25a51.6 51.6 0 0 0 16.27 18.55c.28.2.76.12 1.14.17-.13-.4-.16-.9-.42-1.15-1.35-1.33-2.82-2.51-4.1-3.87-4.18-4.38-7.87-9.1-10.35-14.7-1.17-2.62-2.09-5.34-1.8-8.28.11-1.2.45-2.36.68-3.54l.3.05c-.73 3.69-.14 7.23 1.1 10.94-.2-2.08-.51-3.95-.55-5.81-.06-2.66.37-5.25 2.03-7.47 1.32-1.77 3.13-2.34 5.23-2a9.3 9.3 0 0 1 4.82 2.55c3.46 3.21 5.32 7.3 6.3 11.84.2.95.7 1.56 1.64 1.62.95.06 1.56-.46 1.81-1.41q.25-.93.6-1.82c1.91-4.75 4.96-8.4 10.02-9.89 4.79-1.41 9.27 1.7 9.76 6.68a15 15 0 0 1-1.61 7.92c-3.8 8.06-10.03 13.79-17.66 18.09a32 32 0 0 1-11.28 3.8c-1.1.15-1.7 1.04-1.31 1.91.38.88 1.14 1 1.95.78 2.41-.7 4.88-1.26 7.2-2.19 9.47-3.78 17.42-9.6 23.28-18.08 2.44-3.52 4-7.38 3.8-11.79"
              />
            </g>
          </g>
        </g>
        <g id="Clip path group_2">
          <mask
            id="mask1_94_2"
            width="52"
            height="46"
            x="184"
            y="355"
            maskUnits="userSpaceOnUse"
          >
            <g id="ad130d22f5">
              <path
                id="Vector_3"
                fill="#fff"
                d="M184.44 355.66h50.95v44.72h-50.95z"
              />
            </g>
          </mask>
          <g mask="url(#mask1_94_2)">
            <g id="Group_2">
              <path
                id="Vector_4"
                fill="#000"
                d="M235.36 368.22c-.27-6.33-6.39-11.56-12.62-10.81-4.4.53-7.72 2.93-10.53 6.16-1.17 1.35-2.12 2.9-3.19 4.4l-.62-1.24c-1.58-3.2-3.5-6.13-6.31-8.4-6.94-5.56-15.4-1.88-17.23 5.74-.95 3.95-.16 7.73 1.65 11.25a51.6 51.6 0 0 0 16.27 18.55c.28.2.75.12 1.14.17-.14-.4-.17-.9-.43-1.15-1.35-1.33-2.81-2.51-4.1-3.87-4.17-4.38-7.87-9.1-10.35-14.7-1.17-2.62-2.09-5.34-1.8-8.28.12-1.2.45-2.36.69-3.54l.29.05c-.73 3.69-.14 7.23 1.1 10.94-.2-2.08-.5-3.95-.55-5.81-.06-2.66.38-5.25 2.02-7.47 1.33-1.77 3.14-2.34 5.25-2a9.3 9.3 0 0 1 4.82 2.55c3.46 3.21 5.32 7.3 6.29 11.84.2.95.7 1.56 1.64 1.62.96.06 1.57-.46 1.82-1.41q.23-.93.59-1.82c1.92-4.75 4.96-8.4 10.02-9.89 4.8-1.41 9.27 1.7 9.76 6.68.27 2.8-.43 5.43-1.6 7.92-3.8 8.06-10.04 13.79-17.66 18.09a32 32 0 0 1-11.28 3.8c-1.11.15-1.7 1.04-1.32 1.91.38.88 1.15 1 1.96.78 2.4-.7 4.87-1.26 7.2-2.19 9.47-3.78 17.41-9.6 23.28-18.08 2.44-3.52 3.99-7.38 3.8-11.79"
              />
            </g>
          </g>
        </g>
        <g id="Clip path group_3">
          <mask
            id="mask2_94_2"
            width="52"
            height="46"
            x="250"
            y="355"
            maskUnits="userSpaceOnUse"
          >
            <g id="499fe8b8bf">
              <path
                id="Vector_5"
                fill="#fff"
                d="M250.62 355.66h50.94v44.72h-50.94z"
              />
            </g>
          </mask>
          <g mask="url(#mask2_94_2)">
            <g id="Group_3">
              <path
                id="Vector_6"
                fill="#000"
                d="M301.53 368.22c-.27-6.33-6.38-11.56-12.62-10.81-4.4.53-7.72 2.93-10.52 6.16-1.17 1.35-2.12 2.9-3.2 4.4l-.62-1.24c-1.57-3.2-3.49-6.13-6.3-8.4-6.94-5.56-15.41-1.88-17.24 5.74-.95 3.95-.16 7.73 1.64 11.25a51.6 51.6 0 0 0 16.29 18.55c.27.2.75.12 1.14.17-.14-.4-.18-.9-.43-1.15-1.35-1.33-2.82-2.51-4.11-3.87-4.17-4.38-7.87-9.1-10.34-14.7-1.18-2.62-2.09-5.34-1.8-8.28.11-1.2.45-2.36.68-3.54l.29.05c-.73 3.69-.13 7.23 1.11 10.94-.2-2.08-.5-3.95-.56-5.81-.05-2.66.38-5.25 2.03-7.47 1.32-1.77 3.13-2.34 5.24-2 1.9.3 3.45 1.28 4.82 2.55 3.46 3.21 5.32 7.3 6.3 11.84.19.95.7 1.56 1.63 1.62.96.06 1.57-.46 1.82-1.41q.24-.93.6-1.82c1.91-4.75 4.95-8.4 10.02-9.89 4.79-1.41 9.27 1.7 9.75 6.68.28 2.8-.43 5.43-1.6 7.92-3.8 8.06-10.03 13.79-17.66 18.09a32 32 0 0 1-11.28 3.8c-1.1.15-1.7 1.04-1.31 1.91.38.88 1.15 1 1.95.78 2.4-.7 4.87-1.26 7.2-2.19 9.47-3.78 17.41-9.6 23.28-18.08 2.45-3.52 4-7.38 3.8-11.79"
              />
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="photo-clip">
            <rect x="34.01" y="28.64" width="351.95" height="305.66" />
          </clipPath>
        </defs>

        <g clipPath="url(#photo-clip)">
          <image
            href={image}
            x="34.01"
            y="28.64"
            width="351.95"
            height="305.66"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </g>
    </svg>
  );
};
