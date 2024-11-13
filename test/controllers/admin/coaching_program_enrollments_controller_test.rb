require "test_helper"

class Admin::CoachingProgramEnrollmentsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:one)
    @coaching_program_enrollment = coaching_program_enrollments(:one)
    sign_in @user # Sign in the user
  end

  # Test index action
  test "should get index" do
    get admin_coaching_program_enrollments_url
    assert_response :success
  end

  # Test show action
  test "should show coaching program enrollment" do
    get admin_coaching_program_enrollment_url(@coaching_program_enrollment)
    assert_response :success
  end

  # Test create action
  test "should create coaching program enrollment" do
    assert_difference("CoachingProgramEnrollment.count") do
      post admin_coaching_program_enrollments_url, params: { coaching_program_enrollment: { user_id: @user.id, company_program_id: company_programs(:one).id, status: :joined } }
    end
    assert_response :created
  end

  # Test update action
  test "should update coaching program enrollment" do
    patch admin_coaching_program_enrollment_url(@coaching_program_enrollment), params: { coaching_program_enrollment: { status: :started } }
    assert_response :success
  end

  # Test destroy action
  test "should destroy coaching program enrollment" do
    assert_difference("CoachingProgramEnrollment.count", -1) do
      delete admin_coaching_program_enrollment_url(@coaching_program_enrollment)
    end
    assert_response :ok
  end
end
