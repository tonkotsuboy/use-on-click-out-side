import { Component, MutableRefObject, useEffect } from "react";
import { render } from "react-dom";
import "./style.css";

import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  VFC,
} from "react";
import { render } from "react-dom";
import "./style.css";


/**
 * 要素外クリック用Hooks 
 */
const useOnClickOutside = (
  ref: MutableRefObject<HTMLElement | undefined>,
  handler: EventListener
) => {
  useEffect(
    () => {
      const listener: EventListener = (event) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
};

const App: VFC = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const [isModalOpen, setModalOpen] = useState(false);

  // refで参照した要素外を押したら、setModalOpen(false)を実行💐
  useOnClickOutside(ref, () => setModalOpen(false));

  return (
    <div>
      {isModalOpen ? (
        <>
          <div className="modal_bg" />
          <div ref={ref} className="modal">
            🐈モーダル🐈
          </div>
        </>
      ) : (
        <button onClick={() => setModalOpen(true)}>モーダルを開く</button>
      )}
    </div>
  );
};

render(<App />, document.getElementById("root"));
