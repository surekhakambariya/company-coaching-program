class CoachingProgram < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :coach, class_name: "User", foreign_key: "coach_id", optional: true
  has_many :company_programs, dependent: :destroy

  # Validations
  validates :name, presence: true
  validates :description, presence: true
  validates :user, presence: true

  # Scopes
  scope :ordered, -> { order(created_at: :desc) }
end
