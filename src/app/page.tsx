"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import CodeEditor from "@/components/CodeEditor";
import BlockBuilder from "@/components/BlockBuilder";

const Aside = ({
  data,
  setData,
}: {
  data: SQL_TABLE[];
  setData: Dispatch<SetStateAction<SQL_TABLE[]>>;
}) => {
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

      {menu === "block" ? <BlockBuilder data={data} setData={setData} /> : null}

      {menu === "code" ? <CodeEditor data={data} /> : null}
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
  const [data, setData] = useState<SQL_TABLE[]>([
    {
      id: "fnjkdsanfjd",
      name: "users",
      fields: [{ id: "fnuasdnhfiuadsuhofi", name: "id", type: "int" }],
    },
  ]);

  return (
    <section className="flex flex-row flex-nowrap h-full relative">
      <Aside data={data} setData={setData} />

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
