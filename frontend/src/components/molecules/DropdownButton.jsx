import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export const DropdownButton = ({
  buttonStyle,
  buttonLabel,
  dropdownStyle,
  dropdownOptions,
  icon,
}) => {
  // Estado para controlar o dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  /**
   * useRef: hook do React que guarda um elemento DOM.
   * Inicialmente, seu valor vai ser nulo, e será associado a um elemento real da DOM apenas depois do primeiro render.
   */
  const dropdownRef = useRef(null);

  return (
    <div className="relative z-10" onMouseLeave={() => setDropdownOpen(false)}>
      <button
        onMouseEnter={() => setDropdownOpen((s) => !s)}
        className={buttonStyle}
      >
        {buttonLabel}
        {icon}
      </button>
      <CSSTransition
        in={dropdownOpen}
        timeout={200}
        classNames="dropdown"
        unmountOnExit
        nodeRef={dropdownRef}
      >
        <ul ref={dropdownRef} className={`absolute ${dropdownStyle}`}>
          {/** Essa prop deverá conter as opções em "li" já estilizadas.*/}
          {dropdownOptions.map((item) => (
            <li key={item.name} className={item.optionStyle}>
              {item.value}
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};
