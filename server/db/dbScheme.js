const dbScheme = [
  {
    table_name: "user_info",
    columns: [
      {
        column_name: "user_id",
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
        data_type: "VARCHAR(30)",
        not_null: true,
        unique: true,
      },
      {
        column_name: "address",
        data_type: "VARCHAR(80)",
        not_null: true,
      },
      {
        column_name: "user_picture",
        data_type: "VARCHAR(200)",
      },
      {
        column_name: "email",
        data_type: "VARCHAR(30)",
        not_null: true,
        unique: true,
      },
      {
        column_name: "created_at",
        data_type: "DATE",
        not_null: true,
      },
      {
        column_name: "updated_at",
        data_type: "DATE",
      },
    ],
  },
  {
    table_name: "user_password",
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
      },
    ],
    foreign_keys: [
      {
        column_name: "user_id",
        outer_table: "user_info",
        outer_column: "user_id",
      },
    ],
  },
  {
    table_name: "user_permission",
    columns: [
      {
        column_name: "user_id",
        data_type: "BIGINT",
        unsigned: true,
      },
      {
        column_name: "token",
        data_type: "VARCHAR(60)",
        unique: true,
      },
      {
        column_name: "permission_level",
        data_type: "VARCHAR(10)",
        not_null: true,
      },
    ],
    foreign_keys: [
      {
        column_name: "user_id",
        outer_table: "user_info",
        outer_column: "user_id",
      },
    ],
  },
  {
    table_name: "category",
    columns: [
      {
        column_name: "category_id",
        data_type: "BIGINT",
        unsigned: true,
        auto_increment: true,
        primary_key: true,
      },
      {
        column_name: "category_name",
        data_type: "VARCHAR(20)",
        not_null: true,
      },
    ],
  },
  {
    table_name: "product",
    columns: [
      {
        column_name: "product_id",
        data_type: "BIGINT",
        unsigned: true,
        auto_increment: true,
        primary_key: true,
      },
      {
        column_name: "product_name",
        data_type: "VARCHAR(30)",
        not_null: true,
      },
      {
        column_name: "product_picture",
        data_type: "VARCHAR(200)",
        not_null: true,
      },
      {
        column_name: "price",
        data_type: "INT",
        not_null: true,
      },
      {
        column_name: "category_id",
        data_type: "BIGINT",
        not_null: true,
        unsigned: true,
      },
      {
        column_name: "amount",
        data_type: "INT",
        unsigned: true,
      },
      {
        column_name: "seller_id",
        data_type: "BIGINT",
        unsigned: true,
      },
    ],
    foreign_keys: [
      {
        column_name: "seller_id",
        outer_table: "user_info",
        outer_column: "user_id",
      },
      {
        column_name: "category_id",
        outer_table: "category",
        outer_column: "category_id",
      },
    ],
  },
  {
    table_name: "purchase_history",
    columns: [
      {
        column_name: "user_id",
        data_type: "BIGINT",
        unsigned: true,
        not_null: true,
      },
      {
        column_name: "product_id",
        data_type: "BIGINT",
        unsigned: true,
        not_null: true,
      },
      {
        column_name: "purchase_amount",
        data_type: "BIGINT",
        unsigned: true,
        not_null: true,
      },
      {
        column_name: "purchase_date",
        data_type: "DATE",
        not_null: true,
      },
    ],
    foreign_keys: [
      {
        column_name: "user_id",
        outer_table: "user_info",
        outer_column: "user_id",
      },
      {
        column_name: "product_id",
        outer_table: "product",
        outer_column: "product_id",
      },
    ],
  },
];

module.exports = dbScheme;
