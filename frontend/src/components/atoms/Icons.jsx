export function AddIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="currentColor"
        d="M609.4 149.4L277.8 489.6a32 32 0 0 0 0 44.7l331.6 340.3a29 29 0 0 0 41.7 0a30.6 30.6 0 0 0 0-42.7l-311.8-320L651 192.1a30.6 30.6 0 0 0 0-42.7a29 29 0 0 0-41.7 0"
      />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="currentColor"
        d="M340.9 149.3a30.6 30.6 0 0 0 0 42.8L652.7 512L341 831.9a30.6 30.6 0 0 0 0 42.7a29 29 0 0 0 41.7 0l331.6-340.3a32 32 0 0 0 0-44.6L382.6 149.4a29 29 0 0 0-41.7 0z"
      />
    </svg>
  );
}

export function BorderHeartIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="256"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M178 42c-21 0-39.26 9.47-50 25.34C117.26 51.47 99 42 78 42a60.07 60.07 0 0 0-60 60c0 29.2 18.2 59.59 54.1 90.31a334.7 334.7 0 0 0 53.06 37a6 6 0 0 0 5.68 0a334.7 334.7 0 0 0 53.06-37C219.8 161.59 238 131.2 238 102a60.07 60.07 0 0 0-60-60m-50 175.11c-16.41-9.47-98-59.39-98-115.11a48.05 48.05 0 0 1 48-48c20.28 0 37.31 10.83 44.45 28.27a6 6 0 0 0 11.1 0C140.69 64.83 157.72 54 178 54a48.05 48.05 0 0 1 48 48c0 55.72-81.59 105.64-98 115.11"
      />
    </svg>
  );
}

export function CalendarIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeDasharray="66"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4h7c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1v-14c0 -0.55 0.45 -1 1 -1Z"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.6s"
          values="66;0"
        />
      </path>
      <path fill="currentColor" d="M5 5h14v0h-14Z">
        <animate
          fill="freeze"
          attributeName="d"
          begin="0.6s"
          dur="0.2s"
          to="M5 5h14v3h-14Z"
        />
      </path>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path strokeDasharray="4" strokeDashoffset="4" d="M7 4v-2M17 4v-2">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            to="0"
          />
        </path>
        <path strokeDasharray="12" strokeDashoffset="12" d="M7 11h10">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            to="0"
          />
        </path>
        <path strokeDasharray="10" strokeDashoffset="10" d="M7 15h7">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            to="0"
          />
        </path>
      </g>
    </svg>
  );
}

export function CancelIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2048"
      height="2048"
      viewBox="0 0 2048 2048"
      {...props}
    >
      <path
        fill="currentColor"
        d="m1115 1024l690 691l-90 90l-691-690l-691 690l-90-90l690-691l-690-691l90-90l691 690l691-690l90 90z"
      />
    </svg>
  );
}

export function CodeBarIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5 7a1 1 0 0 0-1 1v22a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1"
        className="clr-i-outline clr-i-outline-path-1"
      />
      <path
        fill="currentColor"
        d="M9 7a1 1 0 0 0-1 1v18a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1"
        className="clr-i-outline clr-i-outline-path-2"
      />
      <path
        fill="currentColor"
        d="M13 7a1 1 0 0 0-1 1v18a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1"
        className="clr-i-outline clr-i-outline-path-3"
      />
      <path
        fill="currentColor"
        d="M17 7a1 1 0 0 0-1 1v18a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1"
        className="clr-i-outline clr-i-outline-path-4"
      />
      <path
        fill="currentColor"
        d="M21 7a1 1 0 0 0-1 1v18a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1"
        className="clr-i-outline clr-i-outline-path-5"
      />
      <path
        fill="currentColor"
        d="M25 7a1 1 0 0 0-1 1v18a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1"
        className="clr-i-outline clr-i-outline-path-6"
      />
      <path
        fill="currentColor"
        d="M29 7a1 1 0 0 0-1 1v18a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1"
        className="clr-i-outline clr-i-outline-path-7"
      />
      <path
        fill="currentColor"
        d="M33 7a1 1 0 0 0-1 1v22a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1"
        className="clr-i-outline clr-i-outline-path-8"
      />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>
  );
}

export function DeleteIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-6.287 10.713Q11 16.425 11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17t.713-.288m4 0Q15 16.426 15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17t.713-.288M7 6v13z"
      />
    </svg>
  );
}

export function DownArrowIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.2 275.4c0-8.6 3.4-17.401 10-24.001c13.2-13.2 34.8-13.2 48 0l451.8 451.8l445.2-445.2c13.2-13.2 34.8-13.2 48 0s13.2 34.8 0 48L542 775.399c-13.2 13.2-34.8 13.2-48 0l-475.8-475.8c-6.8-6.8-10-15.4-10-24.199"
      />
    </svg>
  );
}

export function FailureIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41"
      />
    </svg>
  );
}

export function GiftIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="none"
        d="M346 110a34 34 0 0 0-68 0v34h34a34 34 0 0 0 34-34m-112 0a34 34 0 1 0-34 34h34Z"
      />
      <path
        fill="currentColor"
        d="M234 144h44v112h164a22 22 0 0 0 22-22v-68a22 22 0 0 0-22-22h-59.82A77.95 77.95 0 0 0 256 55.79A78 78 0 0 0 129.81 144H70a22 22 0 0 0-22 22v68a22 22 0 0 0 22 22h164Zm44-34a34 34 0 1 1 34 34h-34Zm-112 0a34 34 0 1 1 68 0v34h-34a34 34 0 0 1-34-34m112 370h132a22 22 0 0 0 22-22V288H278ZM80 458a22 22 0 0 0 22 22h132V288H80Z"
      />
    </svg>
  );
}

export function HeartIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
      />
    </svg>
  );
}

export function ShoppingCartIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      {...props}
    >
      <g fill="none">
        <path fill="currentColor" d="M39 32H13L8 12h36z" />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M3 6h3.5L8 12m0 0l5 20h26l5-20z"
        />
        <circle
          cx="13"
          cy="39"
          r="3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <circle
          cx="39"
          cy="39"
          r="3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
}

export function LoadingIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs>
        <linearGradient
          id="SVGw6R8JeYL"
          x1="50%"
          x2="50%"
          y1="5.271%"
          y2="91.793%"
        >
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient
          id="SVGuYHJbeXC"
          x1="50%"
          x2="50%"
          y1="15.24%"
          y2="87.15%"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <g fill="none">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="url(#SVGw6R8JeYL)"
          d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
          transform="translate(1.5 1.625)"
        />
        <path
          fill="url(#SVGuYHJbeXC)"
          d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
          transform="translate(1.5 1.625)"
        />
      </g>
    </svg>
  );
}

export function HeartLoadingIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="68"
      height="68"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#5a461a"
        fillOpacity="0"
        d="M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9c0 0 -7.43 -7.79 -8.24 -9c-0.48 -0.71 -0.76 -1.57 -0.76 -2.5c0 -2.49 2.01 -4.5 4.5 -4.5c1.56 0 2.87 0.84 3.74 2c0.76 1 0.76 1 0.76 1Z"
      >
        <animate
          fill="freeze"
          attributeName="fillOpacity"
          begin="0.6s"
          dur="2s"
          to="1"
          repeatCount="indefinite"
        />
      </path>
      <path
        fill="none"
        stroke="#5a461a"
        strokeDasharray="30"
        strokeDashoffset="30"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8c0 0 0 0 -0.76 -1c-0.88 -1.16 -2.18 -2 -3.74 -2c-2.49 0 -4.5 2.01 -4.5 4.5c0 0.93 0.28 1.79 0.76 2.5c0.81 1.21 8.24 9 8.24 9M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="2s"
          values="30;0;30"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

export function MainLogoIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="238.99"
      height="231.51"
      viewBox="0 0 238.99 231.51"
      {...props}
    >
      <path
        fill="currentColor"
        id="main_logo"
        d="M231.28.12h-.54c1.08,3.91-4.21,4.69-8.12,4.69h-60.39c-.36,0-.8.03-1.2.03-32.3,1.2-44.58,54.88-54.45,104.93-10.88,55.4-23.94,115.71-63.76,120.16-23.1,2.53-36.52-11.83-36.52-31.62,0-14.2,8.97-26.62,22.02-26.62,8.66,0,16.72,4.61,16.72,15.2-.3,2.77-1.38,5.59-3.61,6.43l.24.54c4.21-1.38,5.6-5.59,5.6-8.36,0-11.67-11.43-14.74-18.95-14.74-16.42,0-28.2,12.11-28.2,26.91,0,20.57,17.38,35.71,42.94,33.48,21.72-1.92,35.68-13.58,44.58-32.46,10.05-21.47,18.94-64.68,22.8-91.98.6-2.23,1.68-2.69,3.37-2.69l44.27-.38c1.93,0,3.61,2.71,3.61,4.21v37.6c0,2.23-1.14,3.85-3.37,3.85h-2.47v.6h36.99v-.6h-5.83c-1.69,0-3.07-1.62-3.07-3.61v-73.75c0-4.21,1.69-5.75,5.6-5.75h27.01c3.31,0,10.53,2.39,10.53,7.98h.6v-17.26h-.6c0,5.53-7.22,7.98-10.53,7.98h-27.01c-3.91,0-5.6-1.6-5.6-5.75V9.41c0-1.93,1.38-3.23,3.07-3.23h34.53c10.83,0,16.72,10.66,16.72,10.66h.54L231.28.12ZM158.07,102.48h-43.19c-2.23,0-3.31-1.84-3.07-3.53l2.53-14.2c7.82-41.2,21.17-78.33,46.8-78.33v-.16l.54,92.39c0,1.99-1.68,3.83-3.61,3.83ZM177.8,145.69c0,1.98-1.38,3.61-3.07,3.61h-3.31c-1.98,0-3.37-1.62-3.37-3.85V9.95c0-2.23,1.38-3.53,3.37-3.53h3.25c1.14-.06,3.13,1.06,3.13,2.99v136.28Z"
      />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="currentColor" d="M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z" />
    </svg>
  );
}

export function ProcessingIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 13.5q.625 0 1.063-.437T8.5 12t-.437-1.062T7 10.5t-1.062.438T5.5 12t.438 1.063T7 13.5m5 0q.625 0 1.063-.437T13.5 12t-.437-1.062T12 10.5t-1.062.438T10.5 12t.438 1.063T12 13.5m5 0q.625 0 1.063-.437T18.5 12t-.437-1.062T17 10.5t-1.062.438T15.5 12t.438 1.063T17 13.5M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </svg>
  );
}

export function ReduceIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.75 12h16.5"
      />
    </svg>
  );
}

export function SectionDividerIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="333"
      height="115"
      fill="none"
      viewBox="0 0 333 115"
      {...props}
    >
      <g>
        <path
          fill="#7e8c54"
          d="m304.793 74.125-4.03-3.669C286.45 57.477 277 48.89 277 38.411c0-8.588 6.726-15.286 15.286-15.286 4.836 0 9.477 2.251 12.507 5.78 3.029-3.529 7.671-5.78 12.507-5.78 8.56 0 15.286 6.698 15.286 15.286 0 10.478-9.45 19.066-23.763 32.045z"
        />
        <path
          fill="#7e8c54"
          d="m27.793 74.125-4.03-3.669C9.45 57.477 0 48.89 0 38.411c0-8.588 6.726-15.286 15.286-15.286 4.836 0 9.478 2.251 12.507 5.78 3.03-3.529 7.67-5.78 12.507-5.78 8.56 0 15.286 6.698 15.286 15.286 0 10.478-9.45 19.066-23.763 32.045z"
        />
        <path
          fill="#3e3e2c"
          stroke="#3e3e2c"
          strokeMiterlimit="10"
          strokeWidth=".25"
          d="M203.314.125h-.265c.529 1.928-2.064 2.312-3.98 2.312h-29.603c-.177 0-.392.015-.589.015-15.833.591-21.852 27.054-26.691 51.728-5.333 27.31-11.735 57.042-31.255 59.236-11.323 1.247-17.902-5.832-17.902-15.588 0-7 4.398-13.123 10.795-13.123 4.245 0 8.196 2.273 8.196 7.493-.147 1.366-.677 2.756-1.77 3.17l.118.266c2.063-.68 2.745-2.755 2.745-4.12 0-5.754-5.603-7.267-9.289-7.267-8.05 0-13.824 5.97-13.824 13.266 0 10.14 8.52 17.604 21.049 16.505 10.647-.947 17.49-6.695 21.853-16.002 4.926-10.585 9.284-31.886 11.176-45.345.295-1.099.824-1.326 1.652-1.326l21.701-.187c.946 0 1.77 1.336 1.77 2.075V71.77c0 1.1-.559 1.898-1.652 1.898h-1.211v.296h18.133v-.296h-2.858c-.829 0-1.505-.798-1.505-1.78V35.532c0-2.076.828-2.835 2.745-2.835h13.24c1.623 0 5.162 1.178 5.162 3.934h.294v-8.509h-.294c0 2.726-3.539 3.934-5.162 3.934h-13.24c-1.917 0-2.745-.789-2.745-2.834V4.705c0-.952.676-1.593 1.505-1.593h16.926c5.309 0 8.196 5.256 8.196 5.256H207zm-35.888 50.461h-21.171c-1.093 0-1.623-.907-1.505-1.74l1.24-7c3.834-20.311 10.378-38.615 22.941-38.615v-.08l.265 45.547c0 .981-.823 1.888-1.77 1.888Zm9.672 21.302c0 .976-.676 1.78-1.505 1.78h-1.622c-.971 0-1.652-.8-1.652-1.899V4.971c0-1.1.676-1.74 1.652-1.74h1.593c.559-.03 1.534.522 1.534 1.474z"
        />
      </g>
    </svg>
  );
}

export function SuccessIcon(props) {
  return (
    <svg
      className="w-10 h-10 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
