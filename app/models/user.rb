class User < ApplicationRecord
  rolify
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Associations
  belongs_to :company, foreign_key: :company_id, optional: true
  has_many :coaching_programs, foreign_key: "coach_id"
  has_one :company_program, foreign_key: "coach_id"
  has_many :coaching_program_enrollments

  # Validations
  validates :email, presence: true, uniqueness: true

  # Callbacks
  # after_create :assign_default_role

  # Check if the user has a specific role
  def admin?
    has_role?(:admin)
  end

  def coach?
    has_role?(:coach)
  end

  def employee?
    has_role?(:employee)
  end

  def assign_default_role(role = :admin)
    add_role(role)
  end

  def password_required?
    new_record? ? false : super
  end
end
