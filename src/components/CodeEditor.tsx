import { useState, useRef, useCallback } from "react";

function dataToCode(data: SQL_TABLE[]) {
  let code = "";

  data.forEach((table, tableIdx) => {
    code += `CREATE TABLE ${table.name} (\n`;

    table.fields.forEach((col, index) => {
      code += `\t${col.name} ${col.type.toUpperCase()}${
        index !== table.fields.length - 1 ? "," : ""
      }\n`;
    });

    code += ");";

    if (tableIdx !== data.length - 1) code += "\n\n";
  });

  return code;
}

export default function CodeEditor({ data }: { data: SQL_TABLE[] }) {
  const [code, setCode] = useState(dataToCode(data));
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
          onChange={(evt) => setCode(evt.target.value)}
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
}
