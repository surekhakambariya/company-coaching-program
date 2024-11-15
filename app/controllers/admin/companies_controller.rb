class Admin::CompaniesController < ApplicationController
  before_action :find_company, only: %i[show update destroy]

  def index
    @companies = Company.includes(:company_programs).order(created_at: :desc)
    if @companies.any?
      render json: @companies.as_json(include: :company_programs)
    else
      render json: { error: "No companies found" }, status: :not_found
    end
  end

  def show
    render json: @company
  end

  def create
    @company = Company.new(company_params)
    @company.user_id = current_user.id # this user is admin
    if @company.save
      render json: @company, status: :created
    else
      render json: { errors: @company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @company.update(company_params)
      render json: @company
    else
      render json: { errors: @company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @company.destroy
      render json: { message: "Company deleted successfully" }, status: :ok
    else
      render json: { errors: @company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def company_params
    params.require(:company).permit(:name, :description, :website, :user_id)
  end

  def find_company
    @company = Company.find_by(id: params[:id])
    render json: { error: "Company not found" }, status: :not_found if @company.nil?
  end
end
