class CreateCoachingProgramEnrollments < ActiveRecord::Migration[7.2]
  def change
    create_table :coaching_program_enrollments do |t|
      t.integer :status
      t.references :user, null: false, foreign_key: true
      t.references :company_program, null: false, foreign_key: true

      t.timestamps
    end
  end
end
