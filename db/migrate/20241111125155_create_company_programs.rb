class CreateCompanyPrograms < ActiveRecord::Migration[7.2]
  def change
    create_table :company_programs do |t|
      t.references :company, null: false, foreign_key: true
      t.references :coaching_program, null: false, foreign_key: true
      t.references :coach, null: false, foreign_key:  { to_table: :users }

      t.timestamps
    end
  end
end
