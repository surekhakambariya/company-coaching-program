class CoachingProgramEnrollment < ApplicationRecord
  # Associations
  belongs_to :user # only employees user can join in coaching programs
  belongs_to :company_program

  # Enums
  enum status: %i[joined started finish leave]

  # Validations
  validates :user, presence: true
  validates :company_program, presence: true
  validates :status, presence: true

  # Callbacks
  before_create :set_default_status

  def set_default_status
    self.status = :joined unless status.present?
  end
end
