"use client";

import { useEffect, useRef, useState } from "react";

const BlockBuilder = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col flex-nowrap grow">
      <div className="grow">
        <button type="button" className="" onClick={() => {}}>
          New Table
        </button>
      </div>

      <div className="shrink-0 w-full h-12">
        <label
          className="flex flex-row flex-nowrap w-full h-full items-center border-t border-slate-300 bg-white p-2"
          htmlFor="search"
        >
          <div className="w-6 h-6 mr-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <g>
                  <circle
                    cx="10.5"
                    cy="10.5"
                    r="6.5"
                    stroke="#000000"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
                    fill="#000000"
                  />
                </g>
              </g>
            </svg>
          </div>

          <input
            className="grow"
            name="search"
            placeholder="Search for a table name ..."
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

const CodeEditor = () => {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col flex-nowrap grow ">
      <div className="grow">Code Editor</div>

      <div className="h-12 shrink-0 w-full border-t border-slate-300 bg-white p-2">
        Status
      </div>
    </div>
  );
};

const Aside = () => {
  const [menu, setMenu] = useState("block");

  return (
    <aside className="flex flex-col flex-nowrap w-80 shrink-0 border-r border-slate-200">
      <div className="flex flex-row flex-nowrap">
        <button
          className="font-semibold w-1/2 border-b-2 text-neutral-500 border-neutral-500/20 disabled:text-black disabled:border-black py-4"
          disabled={menu === "code"}
          type="button"
          onClick={() => setMenu("code")}
        >
          Code Editor
        </button>

        <button
          className="font-semibold w-1/2 border-b-2 text-neutral-500 border-neutral-500/20 disabled:text-black disabled:border-black py-4"
          disabled={menu === "block"}
          type="button"
          onClick={() => setMenu("block")}
        >
          Block Builder
        </button>
      </div>

      {menu === "block" ? <BlockBuilder /> : null}

      {menu === "code" ? <CodeEditor /> : null}
    </aside>
  );
};

const Diagram = ({ items }: { items: any[] }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const drawTable = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#000000";
    ctx.roundRect(20, 20, 100, 100, 4);
    ctx.fill();
  };

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");

    if (ctx) {
      drawTable(ctx);
    }
  }, [items]);

  return (
    <div className="flex flex-col flex-nowrap h-full w-full">
      <div className="h-12 bg-white shrink-0"> </div>

      <div className="grow">
        <canvas className="w-full h-full" ref={ref} />
      </div>
    </div>
  );
};

export default function Home() {
  const [zoom, setZoom] = useState(100);

  return (
    <section className="flex flex-row flex-nowrap h-full">
      <Aside />

      <div className="grow relative bg-[#f9f9f9]">
        <Diagram
          items={[
            { title: "Table Title", fields: [{ name: "id", type: "int" }] },
          ]}
        />
        <div className="absolute bottom-2 w-full h-8">
          <div className="flex flex-row flex-nowrap items-center">
            <div className="w-12 h-8 rounded-md bg-white text-slate-600 text-center border border-slate-200 pt-1">
              {zoom}%
            </div>

            <button
              className="w-8 h-8 rounded-md bg-white mx-1 border border-slate-200"
              type="button"
              disabled={zoom === 200}
              onClick={() => {
                setZoom((old) => old + 25);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M12 6V18"
                    stroke="#475569"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 12H18"
                    stroke="#475569"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>

            <button
              className="w-8 h-8 rounded-md bg-white border border-slate-200 disabled:bg-slate"
              type="button"
              disabled={zoom === 0}
              onClick={() => {
                setZoom((old) => old - 25);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M6 12H18"
                    stroke="#475569"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
