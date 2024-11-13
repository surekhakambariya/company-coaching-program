require "test_helper"

class CoachingProgramEnrollmentTest < ActiveSupport::TestCase
  test "should be valid with valid attributes" do
    enrollment = CoachingProgramEnrollment.new(user: users(:one), company_program: company_programs(:one), status: :joined)
    assert enrollment.valid?
  end

  test "should not be valid without a user" do
    enrollment = CoachingProgramEnrollment.new(company_program: company_programs(:one), status: :joined)
    assert_not enrollment.valid?
  end

  test "should not be valid without a company program" do
    enrollment = CoachingProgramEnrollment.new(user: users(:one), status: :joined)
    assert_not enrollment.valid?
  end

  test "should not be valid without a status" do
    enrollment = CoachingProgramEnrollment.new(user: users(:one), company_program: company_programs(:one))
    assert_not enrollment.valid?
  end
end
