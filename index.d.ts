type SQL_COL = {
  id: string;
  name: string;
  type: string;
};

type SQL_TABLE = {
  id: string;
  name: string;
  fields: SQL_COL[];
};

type USER_SQL = SQL_TABLE[];
