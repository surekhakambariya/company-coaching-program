class CreateCoachingPrograms < ActiveRecord::Migration[7.2]
  def change
    create_table :coaching_programs do |t|
      t.string :name
      t.text :description
      t.bigint :coach_id
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
