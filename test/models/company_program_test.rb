require "test_helper"

class CompanyProgramTest < ActiveSupport::TestCase
  # Test associations
  test "should belong to company" do
    company_program = company_programs(:one)
    assert_equal companies(:one), company_program.company
  end

  test "should belong to coaching program" do
    company_program = company_programs(:one)
    assert_equal coaching_programs(:one), company_program.coaching_program
  end

  test "should belong to coach" do
    company_program = company_programs(:one)
    assert_equal users(:one), company_program.coach
  end

  # Test validations (if any)
  test "should be valid with valid attributes" do
    company_program = CompanyProgram.new(company: companies(:one), coaching_program: coaching_programs(:one), coach: users(:one))
    assert company_program.valid?
  end

  test "should not be valid without a company" do
    company_program = CompanyProgram.new(coaching_program: coaching_programs(:one), coach: users(:one))
    assert_not company_program.valid?
  end

  # Add more tests as needed
end
