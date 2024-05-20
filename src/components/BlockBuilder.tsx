import { Dispatch, SetStateAction, useState, useCallback } from "react";
import ConfirmationButton from "./ConfirmationButton";
import DropDownSelector from "./DropdownSelector";
import Modal from "./Modal";

const SQL_DATA_TYPE = ["int", "varchar", "float", "double", "bool", "char"];

const CreateTable = ({
  onCreate,
  onClose,
  initId,
  initName,
  initFields,
}: {
  initId?: string;
  initName?: string;
  initFields?: SQL_COL[];
  onCreate: ({ name, fields }: SQL_TABLE) => void;
  onClose: () => void;
}) => {
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [title, setTitle] = useState(initName || "");
  const [columns, setColumns] = useState<
    { id: string; name: string; type: string }[]
  >(
    initFields || [
      { id: "2", name: "tesst", type: "int" },
      { id: "1", name: "test 2", type: "varchar" },
    ]
  );

  const validateInputs = useCallback(() => {
    const errors: { title?: string } = {};

    if (title.trim() === "") errors.title = "Invalid Title";
    if (Object.keys(errors).length) return setErrors(errors);

    onCreate({
      id: initId || window.crypto.randomUUID(),
      name: title,
      fields: columns,
    });
    setTitle(initName || "");
    setColumns(initFields || []);
  }, [title, columns, onCreate, initId, initName, initFields]);

  return (
    <Modal onClose={onClose}>
      <div className="py-2 rounded-md bg-white">
        <header className="flex flex-row flex-nowrap pt-2 pb-8 px-2 relative items-center">
          <div className="grow w-0">
            <input
              className={`w-full font-semibold text-2xl mr-4 outline-none border border-slate-300 px-1 py-1 rounded-md ${
                errors.title ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Table Name ..."
              value={title}
              onChange={(evt) => setTitle(evt.target.value)}
            />

            {errors.title ? (
              <span className="text-sm ">{errors.title}</span>
            ) : null}
          </div>

          <button
            className="transition-colors bg-slate-200/20 rounded-full hover:bg-slate-300 w-8 h-8"
            type="button"
            onClick={onClose}
          >
            X
          </button>
        </header>

        <div className="flex flex-col flex-nowrap relative">
          <div className="flex flex-row flex-nowrap border-b border-slate-300 mb-2 px-4">
            <div className="grow">Name</div>

            <div>Type</div>
          </div>

          <div className="h-44 overflow-y-auto px-4">
            {columns.map((col) => (
              <div
                className="flex flex-row flex-nowrap items-center py-1"
                key={`create-colums-${col.id}`}
              >
                <button
                  type="button"
                  className="transition-colors shrink-0 rounded-full w-6 h-6 mr-1 text-slate-500 text-sm hover:text-red-500 hover:bg-slate-500/10"
                  onClick={() =>
                    setColumns((old) =>
                      old.filter((oldCol) => oldCol.id !== col.id)
                    )
                  }
                >
                  X
                </button>

                <input
                  type="text"
                  className="grow px-1 mr-2 w-0"
                  value={col.name}
                  onChange={(evt) =>
                    setColumns((old) =>
                      old.map((oldCol) =>
                        oldCol.id !== col.id
                          ? oldCol
                          : { ...oldCol, name: evt.target.value }
                      )
                    )
                  }
                />

                <DropDownSelector
                  onSelect={(option) =>
                    setColumns((old) =>
                      old.map((oldCol) =>
                        oldCol.id !== col.id
                          ? oldCol
                          : { ...oldCol, type: option }
                      )
                    )
                  }
                  selected={col.type}
                  options={SQL_DATA_TYPE}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setColumns((old) => [
                ...old,
                { id: window.crypto.randomUUID(), name: "", type: "int" },
              ])
            }
            type="button"
            className="border border-slate-300 mx-4 py-1 rounded-md px-4"
          >
            Add column
          </button>
        </div>

        <button
          className="block bg-blue-300 rounded-md w-full max-w-32 py-1 mt-2 mx-auto"
          type="button"
          onClick={() => validateInputs()}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

const BlockTable = ({
  id,
  name,
  fields,
  onUpdate,
  onDelete,
}: {
  id: string;
  name: string;
  fields: SQL_COL[];
  onUpdate: (id: string, name: string, fields: SQL_COL[]) => void;
  onDelete: (name: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [editting, setEditting] = useState(false);

  return (
    <div className="py-1">
      {editting ? (
        <CreateTable
          initId={id}
          initName={name}
          initFields={fields}
          onCreate={({ name: newName, fields: newFields }) => {
            setEditting(false);
            onUpdate(id, newName, newFields);
          }}
          onClose={() => {
            setEditting(false);
          }}
        />
      ) : null}

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
        {fields.map((field) => (
          <div
            key={`table-${name}-${field.name}`}
            className="flex flex-row flex-nowrap px-4 py-2"
          >
            <div className="grow">{field.name}</div>
            <div className="px-2 py-1 border border-slate-300 rounded">
              {field.type}
            </div>
            <div className=""></div>
          </div>
        ))}

        <div className="flex flex-row flex-nowrap border-t border-slate-300 py-2 justify-between ">
          <ConfirmationButton
            message={`Are you sure you want to delete  table: ${name}?`}
            onConfirm={() => onDelete(name)}
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
          </ConfirmationButton>

          <button
            className="border border-slate-300 rounded-md p-1"
            type="button"
            onClick={() => setEditting((old) => !old)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default function BlockBuilder({
  data,
  setData,
}: {
  data: SQL_TABLE[];
  setData: Dispatch<SetStateAction<SQL_TABLE[]>>;
}) {
  const [search, setSearch] = useState("");
  const [createTable, setCreateTable] = useState(false);

  const onDelete = useCallback(
    (name: string) => {
      setData((old) => old.filter((table) => table.name !== name));
    },
    [setData]
  );

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

        {createTable ? (
          <CreateTable
            onClose={() => setCreateTable(false)}
            onCreate={({ id, name, fields }) => {
              setCreateTable(false);
              setData((old) => [...old, { id, name, fields }]);
            }}
          />
        ) : null}
      </div>

      <div className="grow h-0 overflow-y-auto px-2">
        {data
          .filter((table) => table.name.includes(search))
          .map((table) => (
            <BlockTable
              key={`block-table-${table.id}`}
              id={table.id}
              name={table.name}
              fields={table.fields}
              onUpdate={(id, name, fields) => {
                setData((old) =>
                  old.map((oldTable) =>
                    oldTable.id !== id ? oldTable : { id, name, fields }
                  )
                );
              }}
              onDelete={onDelete}
            />
          ))}
      </div>

      <div className="shrink-0 w-full h-12">
        <label
          className="flex flex-row flex-nowrap w-full h-full items-center border-t border-slate-300 bg-white p-2 group focus-within:border-black"
          htmlFor="search"
        >
          <div className="w-6 h-6 mr-2">
            <svg
              viewBox="0 0 24 24"
              className="fill-white stroke-slate-500 group-focus-within:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <g>
                  <circle cx="10.5" cy="10.5" r="6.5" strokeLinejoin="round" />
                  <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" />
                </g>
              </g>
            </svg>
          </div>

          <input
            id="search"
            name="search"
            className="grow outline-none"
            placeholder="Search for a table name ..."
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
          />

          <button
            className="ml-2 rounded-full w-6 h-6 text-slate-500 group-focus-within:text-black"
            type="button"
            onClick={() => setSearch("")}
          >
            X
          </button>
        </label>
      </div>
    </div>
  );
}
