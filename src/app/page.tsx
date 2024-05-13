"use client";

import Modal from "@/components/Modal";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const CreateTable = ({
  visible,
  setVisible,
  onCreate,
}: {
  visible: boolean;
  setVisible: (val: boolean) => void;
  onCreate: (val: any) => void;
}) => {
  const [columns, setColumns] = useState<{ name: string; type: string }[]>([
    { name: "tesst", type: "int" },
    { name: "test 2", type: "varchar" },
  ]);

  if (!visible) return null;

  return (
    <Modal onClose={() => setVisible(false)}>
      <div className="py-2">
        <header className="pb-4 px-2">
          <h3 className="font-semibold text-2xl">Create Table</h3>
        </header>

        <div className="flex flex-col flex-nowrap px-4">
          <div className="flex flex-row flex-nowrap border-b border-slate-300 mb-2">
            <div className="grow">Name</div>

            <div>Type</div>
          </div>

          {columns.map((col) => (
            <div
              className="flex flex-row flex-nowrap py-1"
              key={`create-colums-${col.name}`}
            >
              <div className="grow">{col.name}</div>

              <div className="border-slate-300 border px-2 py-1 rounded-md">
                {col.type}
              </div>
            </div>
          ))}

          <button
            onClick={() => {}}
            type="button"
            className="border border-slate-300 px-2 py-1 rounded-md"
          >
            Add column
          </button>
        </div>

        <button
          className="block bg-blue-300 rounded-md w-full max-w-32 py-1 mt-2 mx-auto"
          type="button"
          onClick={() => {}}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

const BlockTable = ({
  name,
  fields,
}: {
  name: string;
  fields: { title: string; type: string };
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="py-1">
      <button
        className="flex flex-row flex-nowrap bg-slate-100 w-full text-left border border-slate-300 items-center px-2 py-1.5 rounded-md"
        type="button"
        onClick={() => setExpanded((old) => !old)}
      >
        <div className="grow">{name}</div>

        <div
          className={`translate-transform w-6 h-6 ${
            expanded ? "" : "rotate-180"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M5 15L10 9.84985C10.2563 9.57616 10.566 9.35814 10.9101 9.20898C11.2541 9.05983 11.625 8.98291 12 8.98291C12.375 8.98291 12.7459 9.05983 13.0899 9.20898C13.434 9.35814 13.7437 9.57616 14 9.84985L19 15"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </button>

      <div className={`${expanded ? "block" : "hidden"}`}>
        <div className="flex flex-row flex-nowrap px-4 py-2">
          <div className="grow">{fields.title}</div>
          <div className="px-2 py-1 border border-slate-300 rounded">
            {fields.type}
          </div>
          <div className=""></div>
        </div>

        <div className="flex flex-row flex-nowrap border-t border-slate-300 py-2 justify-between ">
          <button
            type="button"
            className="border border-slate-300 rounded-md p-1"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M9.1709 4C9.58273 2.83481 10.694 2 12.0002 2C13.3064 2 14.4177 2.83481 14.8295 4"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M20.5001 6H3.5"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9.5 11L10 16"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14.5 11L14 16"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </button>

          <button
            className="border border-slate-300 rounded-md p-1"
            type="button"
            onClick={() => {}}
          >
            New Column
          </button>
        </div>
      </div>
    </div>
  );
};

const BlockBuilder = () => {
  const [search, setSearch] = useState("");
  const [createTable, setCreateTable] = useState(false);

  return (
    <div className="flex flex-col flex-nowrap grow">
      <div className="p-2">
        <button
          type="button"
          className="bg-black w-full rounded-md py-2 text-white font-normal"
          onClick={() => setCreateTable((old) => !old)}
        >
          New Table
        </button>

        <CreateTable
          visible={createTable}
          setVisible={setCreateTable}
          onCreate={() => {}}
        />
      </div>

      <div className="grow h-0 overflow-y-auto px-2">
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />

        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
        <BlockTable name={"users"} fields={{ title: "id", type: "int" }} />
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
            id="search"
            name="search"
            className="grow"
            placeholder="Search for a table name ..."
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

const CodeEditor = ({
  code,
  onCodeChange,
}: {
  code: string;
  onCodeChange: (val: string) => void;
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const getLineCount = useCallback((line: string) => {
    if (!textRef.current) return 0;

    const textareaStyles = window.getComputedStyle(textRef.current);
    const parseValue = (v: string) =>
      v.endsWith("px") ? parseInt(v.slice(0, -2), 10) : 0;
    const font = `${textareaStyles.fontSize} ${textareaStyles.fontFamily}`;
    const paddingLeft = parseValue(textareaStyles.paddingLeft);
    const paddingRight = parseValue(textareaStyles.paddingRight);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) context.font = font;

    const textWidth =
      textRef.current?.getBoundingClientRect().width -
      paddingLeft -
      paddingRight;
    const words = line.split(" ");
    let lineCount = 0;
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const wordWidth = context?.measureText(words[i] + " ").width || 0;
      const lineWidth = context?.measureText(currentLine).width || 0;

      if (lineWidth + wordWidth > textWidth) {
        lineCount++;
        currentLine = words[i] + " ";
      } else {
        currentLine += words[i] + " ";
      }
    }

    if (currentLine.trim() !== "") lineCount++;

    return lineCount;
  }, []);

  const calculateLineNumbers = useCallback(
    (textSplit: string[]) => {
      const numLines = textSplit.map((line: string) => getLineCount(line));
      if (numLines.length === 0) return [];

      let lineNumbers = [];
      let i = 1;
      while (numLines.length > 0) {
        const numOfLines = numLines.shift();
        lineNumbers.push(i++);
        if ((numOfLines as number) > 1) {
          Array((numOfLines as number) - 1)
            .fill("")
            .forEach((_) => lineNumbers.push(""));
        }
      }

      return lineNumbers;
    },
    [getLineCount]
  );

  return (
    <div className="flex flex-col flex-nowrap grow">
      <div className="grow relative">
        <div
          className="flex flex-col flex-nowrap absolute bg-slate-300 w-6 text-md h-full overflow-y-hidden text-nowrap"
          ref={lineRef}
        >
          {calculateLineNumbers(code.split("\n")).map((count, index) => (
            <div className="" key={`code-editor-line-${count}-${index}`}>
              &nbsp;
              {count}
            </div>
          ))}
        </div>

        <textarea
          ref={textRef}
          className="w-full pl-6 h-full resize-none outline-none"
          value={code}
          placeholder="SQL for your diagram"
          onChange={(evt) => onCodeChange(evt.target.value)}
          onScroll={(evt) => {
            if (lineRef.current && textRef.current)
              lineRef.current.scrollTop = textRef.current.scrollTop;
          }}
        />
      </div>

      <div className="h-12 shrink-0 w-full border-t border-slate-300 bg-white p-2">
        Status
      </div>
    </div>
  );
};

const Aside = () => {
  const [menu, setMenu] = useState("block");
  const [code, setCode] = useState("");

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

      {menu === "code" ? (
        <CodeEditor code={code} onCodeChange={setCode} />
      ) : null}
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
