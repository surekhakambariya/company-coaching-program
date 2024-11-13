require "test_helper"

class UserTest < ActiveSupport::TestCase
  # Load the fixtures
  fixtures :users

  # Test validations
  test "should not save user without email" do
    user = User.new(email: nil) # Create a new user without an email
    assert_not user.valid?, "User is valid without an email"
    assert_includes user.errors[:email], "can't be blank", "No validation error for blank email"
  end

  test "should save user with valid email" do
    user = User.new(email: "unique_email@example.com") # Use a unique email
    assert user.save, "Failed to save the user with a valid email"
  end

  test "should assign default role" do
    user = users(:one) # Use the fixture user
    user.assign_default_role
    assert user.has_role?(:admin), "Default role was not assigned correctly"
  end
end
