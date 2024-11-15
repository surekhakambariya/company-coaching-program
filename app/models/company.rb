class Company < ApplicationRecord
  # Associations
  belongs_to :user # this user is admin
  has_many :company_programs, dependent: :destroy
  has_many :coaching_programs, through: :company_programs

  # Validations
  validates :name, presence: true

  # Scopes
  scope :ordered, -> { order(created_at: :desc) }
end
