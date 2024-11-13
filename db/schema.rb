# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_11_12_072911) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coaching_program_enrollments", force: :cascade do |t|
    t.integer "status"
    t.bigint "user_id", null: false
    t.bigint "company_program_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_program_id"], name: "index_coaching_program_enrollments_on_company_program_id"
    t.index ["user_id"], name: "index_coaching_program_enrollments_on_user_id"
  end

  create_table "coaching_programs", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "coach_id"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_coaching_programs_on_user_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "website"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_companies_on_user_id"
  end

  create_table "company_programs", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "coaching_program_id", null: false
    t.bigint "coach_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coach_id"], name: "index_company_programs_on_coach_id"
    t.index ["coaching_program_id"], name: "index_company_programs_on_coaching_program_id"
    t.index ["company_id"], name: "index_company_programs_on_company_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "company_id"
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  add_foreign_key "coaching_program_enrollments", "company_programs"
  add_foreign_key "coaching_program_enrollments", "users"
  add_foreign_key "coaching_programs", "users"
  add_foreign_key "companies", "users"
  add_foreign_key "company_programs", "coaching_programs"
  add_foreign_key "company_programs", "companies"
  add_foreign_key "company_programs", "users", column: "coach_id"
  add_foreign_key "users", "companies"
end
