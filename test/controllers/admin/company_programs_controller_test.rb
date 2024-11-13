require "test_helper"

class Admin::CompanyProgramsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @company_program = company_programs(:one)
    @company = companies(:one)
    @user = users(:admin)
    sign_in @user
  end

  test "should get index" do
    get admin_company_programs_url(company_id: @company.id)
    assert_response :success
    assert_not_nil JSON.parse(@response.body)
  end

  test "should show company program" do
    get admin_company_program_url(company_id: @company.id, id: @company_program.id)
    assert_response :success
    assert_equal @company_program.id, JSON.parse(@response.body)["id"]
  end

  test "should create company program" do
    assert_difference("CompanyProgram.count") do
      post admin_company_programs_url(company_id: @company.id), params: { company_program: { coaching_program_id: coaching_programs(:one).id, coach_id: users(:coach).id } }
    end
    assert_response :created
  end

  test "should update company program" do
    patch admin_company_program_url(company_id: @company.id, id: @company_program.id), params: { company_program: { coaching_program_id: coaching_programs(:two).id } }
    assert_response :success
    @company_program.reload
    assert_equal coaching_programs(:two).id, @company_program.coaching_program_id
  end

  test "should destroy company program" do
    assert_difference("CompanyProgram.count", -1) do
      delete admin_company_program_url(company_id: @company.id, id: @company_program.id)
    end
    assert_response :ok
  end
end
