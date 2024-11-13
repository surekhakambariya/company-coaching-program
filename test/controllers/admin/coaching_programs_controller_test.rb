require "test_helper"

class Admin::CoachingProgramsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:coach)
    @coaching_program = coaching_programs(:one)
    sign_in @user # Sign in the user
  end

  # Test index action
  test "should get index" do
    get admin_coaching_programs_url
    assert_response :success
  end

  # Test show action
  test "should show coaching program" do
    get admin_coaching_program_url(@coaching_program)
    assert_response :success
  end

  # Test create action
  test "should create coaching program" do
    assert_difference("CoachingProgram.count") do
      post admin_coaching_programs_url, params: { coaching_program: { name: "New Program", description: "Description", user_id: @user.id } }
    end
    assert_response :created
  end

  # Test update action
  test "should update coaching program" do
    patch admin_coaching_program_url(@coaching_program), params: { coaching_program: { name: "Updated Name" } }
    assert_response :success
  end

  # Test destroy action
  test "should destroy coaching program" do
    assert_difference("CoachingProgram.count", -1) do
      delete admin_coaching_program_url(@coaching_program)
    end
    assert_response :ok
  end
end
