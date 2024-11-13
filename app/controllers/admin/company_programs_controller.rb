class Admin::CompanyProgramsController < ApplicationController
  before_action :find_company, only: %i[show index create update destroy]
  before_action :find_company_program, only: %i[show update destroy]

  def index
    # TODO: Refector this method to use ActiveRecord's eager loading or include associations
    @company_programs = @company.company_programs.all
    if @company_programs
      render json: @company_programs.as_json(include: %i[coaching_program coach])
    else
      render json: { error: "No company programs found" }, status: :not_found
    end
  end

  def show
    render json: @company_program
  end

  def create
    @company_program = @company.company_programs.new(company_program_params)
    if @company_program.save
      render json: @company_program, status: :created
    else
      render json: { errors: @company_program.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @company_program.update(company_program_params)
      render json: @company_program
    else
      render json: { errors: @company_program.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @company_program.destroy
      render json: { message: "Company program deleted successfully" }, status: :ok
    else
      render json: { errors: @company_program.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def company_program_params
    params.require(:company_program).permit(:company_id, :coaching_program_id, :coach_id)
  end

  def find_company
    @company = Company.find_by(id: params[:company_id])
    render json: { error: "Company not found" }, status: :not_found if @company.nil?
  end

  def find_company_program
    @company_program = @company.company_programs.find_by(id: params[:id])
    render json: { error: "Company program not found" }, status: :not_found if @company_program.nil?
  end
end
