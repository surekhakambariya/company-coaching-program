require "test_helper"

class CompanyTest < ActiveSupport::TestCase
  # Test validations
  test "should not save company without name" do
    company = Company.new(description: "MyText", website: "MyString", user_id: 1)
    assert_not company.save, "Saved the company without a name"
  end

  test "should save company with valid attributes" do
    company = companies(:one) # Using fixture
    assert company.save, "Failed to save the company with valid attributes"
  end
end
