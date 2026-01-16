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

export function LeartLoadingIcon(props) {
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
        fill-opacity="0"
        d="M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9c0 0 -7.43 -7.79 -8.24 -9c-0.48 -0.71 -0.76 -1.57 -0.76 -2.5c0 -2.49 2.01 -4.5 4.5 -4.5c1.56 0 2.87 0.84 3.74 2c0.76 1 0.76 1 0.76 1Z"
      >
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="0.6s"
          dur="2s"
          to="1"
          repeatCount="indefinite"
        />
      </path>
      <path
        fill="none"
        stroke="#5a461a"
        stroke-dasharray="30"
        stroke-dashoffset="30"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
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
