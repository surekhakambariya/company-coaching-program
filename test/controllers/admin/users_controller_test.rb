require "test_helper"

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  # Load the fixtures
  fixtures :users

  setup do
    @user = users(:one) # Use the fixture user
    sign_in @user # Ensure the user is signed in
  end

  test "should get index" do
    get admin_users_url
    assert_response :success
  end

  test "should show user" do
    get admin_user_url(@user)
    assert_response :success
  end

  test "should create user" do
    assert_difference("User.count") do
      post admin_users_url, params: { user: { email: "new_user@example.com", password: "password", password_confirmation: "password" } }
    end
    assert_response :created
  end

  test "should update user" do
    patch admin_user_url(@user), params: { user: { email: "updated_user@example.com" } }
    assert_response :success
  end
end
