require "test_helper"

class Admin::CompaniesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:admin) # This should match the name in your users.yml
    sign_in @user # Sign in the user before each test
    @company = companies(:one) # Using fixture
  end

  test "should get index" do
    get admin_companies_url
    assert_response :success
    assert_not_nil JSON.parse(@response.body)
  end

  test "should show company" do
    get admin_company_url(@company)
    assert_response :success
    assert_equal @company.name, JSON.parse(@response.body)["name"]
  end

  test "should create company" do
    assert_difference("Company.count") do
      post admin_companies_url, params: { company: { name: "New Company", description: "New Description", website: "newwebsite.com", user_id: @user.id } }
    end
    assert_response :created
  end

  test "should update company" do
    patch admin_company_url(@company), params: { company: { name: "Updated Name" } }
    assert_response :success
    @company.reload
    assert_equal "Updated Name", @company.name
  end

  test "should destroy company" do
    assert_difference("Company.count", -1) do
      delete admin_company_url(@company)
    end
    assert_response :ok
  end

  private

  def sign_in(user)
    post user_session_url, params: { user: { email: user.email, password: "password" } } # Adjust according to your authentication setup
  end
end
