class CompanyProgram < ApplicationRecord
  # Associations
  belongs_to :company
  belongs_to :coaching_program
  belongs_to :coach, class_name: "User", foreign_key: "coach_id" # Coach is a User
  has_many :coaching_program_enrollments, dependent: :destroy
  has_many :user_enrollments, through: :coaching_program_enrollments, source: :user
end
