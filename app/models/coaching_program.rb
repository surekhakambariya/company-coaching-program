class CoachingProgram < ApplicationRecord
  # Associations
  belongs_to :user # this user is admin
  belongs_to :coach, class_name: "User", foreign_key: "coach_id", optional: true # Coach is a User
  has_many :company_programs, dependent: :destroy

  # Validations
  validates :name, presence: true
  validates :description, presence: true
  validates :user, presence: true
end
