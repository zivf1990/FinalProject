const dbScheme = [
  {
    table_name: "user",
    columns: [
      {
        column_name: "id",
        data_type: "BIGINT",
        unsigned: true,
        auto_increment: true,
        primary_key: true,
      },
      {
        column_name: "name",
        data_type: "VARCHAR(20)",
        not_null: true,
      },
      {
        column_name: "username",
        data_type: "VARCHAR(20)",
        not_null: true,
        unique: true,
      },

      {
        column_name: "address",
        data_type: "VARCHAR(20)",
        not_null: true,
      },
    ],
  },
  {
    table_name: "password",
    columns: [
      {
        column_name: "password",
        data_type: "VARCHAR(61)",
        not_null: true,
      },
      {
        column_name: "user_id",
        data_type: "BIGINT",
        unsigned: true,
        not_null: true,
        unique: true,
      },
    ],
    foreign_keys: [
      {
        column_name: "user_id",
        outer_table: "user",
        outer_column: "id",
      },
    ],
  },
  {
    table_name: "post",
    columns: [
      {
        column_name: "id",
        data_type: "BIGINT",
        unsigned: true,
        auto_increment: true,
        primary_key: true,
      },
      {
        column_name: "title",
        data_type: "VARCHAR(30)",
        not_null: true,
      },
      {
        column_name: "body",
        data_type: "VARCHAR(150)",
      },

      {
        column_name: "user_id",
        data_type: "BIGINT",
        unsigned: true,
        not_null: true,
      },
    ],
    foreign_keys: [
      {
        column_name: "user_id",
        outer_table: "user",
        outer_column: "id",
      },
    ],
  },
  {
    table_name: "todo",
    columns: [
      {
        column_name: "id",
        data_type: "BIGINT",
        unsigned: true,
        auto_increment: true,
        primary_key: true,
      },
      {
        column_name: "title",
        data_type: "VARCHAR(30)",
        not_null: true,
      },
      {
        column_name: "completed",
        data_type: "BOOLEAN",
        not_null: true,
      },

      {
        column_name: "user_id",
        data_type: "BIGINT",
        unsigned: true,
        not_null: true,
      },
    ],
    foreign_keys: [
      {
        column_name: "user_id",
        outer_table: "user",
        outer_column: "id",
      },
    ],
  },
  {
    table_name: "comment",
    columns: [
      {
        column_name: "id",
        data_type: "BIGINT",
        unsigned: true,
        auto_increment: true,
        primary_key: true,
      },
      {
        column_name: "title",
        data_type: "VARCHAR(30)",
        not_null: true,
      },
      {
        column_name: "body",
        data_type: "VARCHAR(150)",
      },
      {
        column_name: "post_id",
        data_type: "BIGINT",
        unsigned: true,
        not_null: true,
      },
    ],
    foreign_keys: [
      {
        column_name: "post_id",
        outer_table: "post",
        outer_column: "id",
      },
    ],
  },
];

// const insertIntoTable = {
//   table_name: "user_info",
// };

module.exports = dbScheme;
