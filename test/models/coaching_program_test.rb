require "test_helper"

class CoachingProgramTest < ActiveSupport::TestCase
  # Test presence validation for name
  test "should not save coaching program without name" do
    coaching_program = CoachingProgram.new(description: "Some description", user: users(:one))
    assert_not coaching_program.save, "Saved the coaching program without a name"
  end

  # Test successful creation of a coaching program
  test "should save coaching program with valid attributes" do
    program = CoachingProgram.new(name: "Valid Program", description: "A valid description", user: users(:one), coach: users(:two))
    assert program.save, "Failed to save the coaching program with valid attributes"
  end
end
