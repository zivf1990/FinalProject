const sqlManager = {
  createDatabase: async (connection, databaseName) => {
    try {
      await connection.promise().query(`CREATE DATABASE ${databaseName}`);
      console.log(`Database ${databaseName} created successfully`);
    } catch (error) {
      console.log(`Error creating database ${databaseName}: ${error}`);
    }
  },
  createTables: async (connection, dbSchema) => {
    dbSchema.forEach(async (table) => {
      try {
        const query = module.exports.generateTableQuery(table);
        await connection.promise().query(query);
        console.log(`Table ${table.table_name} created successfully`);
      } catch (error) {
        console.log(`Error creating table ${table.table_name}: ${error}`);
      }
    });
  },
  insertTable: async (data, dbSchema, connection) => {
    try {
      const query = module.exports.generateInsertQuery(data, dbSchema);
      await connection.promise().query(query);
      console.log(`Data inserted successfuly into ${data.table_name}`);
    } catch (error) {
      console.log(`Error inserting into table ${data.table_name}: ${error}`);
    }
  },
  generateInsertQuery: (data, dbSchema) => {
    // Check for required fields.
    if (!data.table_name || !data.values) {
      throw new Error("table_name and values are required");
    }

    // Get the schema for the table
    const tableSchema = dbSchema.find(
      (schema) => schema.table_name === data.table_name
    );
    if (!tableSchema) {
      throw new Error(`Table ${data.table_name} not found in schema`);
    }

    // Start building the query string
    let query = `INSERT INTO ${data.table_name} (`;

    // Get the column names from the data object
    let columnNames = Object.keys(data.values);
    query += columnNames.join(", ");
    query += ") VALUES (";

    // Get the values from the data object and add single quotes around string values
    let values = Object.values(data.values).map((value, index) => {
      // Get the column schema for the current value
      const columnSchema = tableSchema.columns.find(
        (column) => column.column_name === columnNames[index]
      );
      if (!columnSchema) {
        throw new Error(
          `Column ${columnNames[index]} not found in schema for table ${data.table_name}`
        );
      }

      // Check if the column is NOT NULL
      if (columnSchema.not_null && value === null) {
        throw new Error(
          `Column ${columnNames[index]} is NOT NULL and cannot be null`
        );
      }

      // Check if the column is UNIQUE
      if (columnSchema.unique) {
        // Here you should check if the value already exists in the database
        // and throw an error if it does
        //(This is not implemented here)
      }

      if (typeof value === "string") {
        return `'${value}'`;
      }
      return value;
    });

    // Join the values and insert into the query
    query += values.join(", ");
    query += ");";

    // Return the final query
    return query;
  },
  generateTableQuery: (table) => {
    //Check for required fields.
    if (!table.table_name || !table.columns) {
      throw new Error("table_name and columns are required");
    }
    table.columns.forEach((column) => {
      if (!column.column_name || !column.data_type) {
        throw new Error(
          "column_name and data_type are required for each column"
        );
      }
    });
    let query = `CREATE TABLE ${table.table_name} (\n`;
    table.columns.forEach((column) => {
      query += `  ${column.column_name} ${column.data_type}`;

      if (column.unsigned) query += " UNSIGNED";
      if (column.auto_increment) query += " AUTO_INCREMENT";
      if (column.primary_key) query += " PRIMARY KEY";
      if (column.not_null) query += " NOT NULL";
      if (column.null) query += " NULL";
      if (column.unique) query += " UNIQUE";
      query += ",\n";
    });

    // Check if foreign_keys property exists in table object and add foreign key syntax to query.
    if (table.foreign_keys) {
      table.foreign_keys.forEach((key) => {
        if (!key.column_name || !key.outer_table || !key.outer_column) {
          throw new Error(
            "column_name, outer_table, and outer_column are required for each foreign key"
          );
        }
        query += `  FOREIGN KEY (${key.column_name}) REFERENCES ${key.outer_table}(${key.outer_column}) ON DELETE CASCADE
        ON UPDATE CASCADE,\n`;
      });
    }
    // remove the "," and close the query.
    query = query.slice(0, -2);
    query += "\n);\n";
    console.log(query);
    return query;
  },
};

module.exports = sqlManager;
