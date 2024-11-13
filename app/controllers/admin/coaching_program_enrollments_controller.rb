class Admin::CoachingProgramEnrollmentsController < ApplicationController
  before_action :find_coaching_program_enrollment, only: %i[show update destroy]

  def index
    @coaching_program_enrollments =  current_user.coaching_program_enrollments
    if @coaching_program_enrollments
      render json: @coaching_program_enrollments
    else
      render json: { errors: "No coaching program enrollments found." }, status: :not_found
    end
  end

  def show
    render json: @coaching_program_enrollment
  end

  def create
    @coaching_program_enrollment = current_user.coaching_program_enrollments.new(coaching_program_enrollment_params)
    if @coaching_program_enrollment.save
      render json: @coaching_program_enrollment, status: :created
    else
      render json: { errors: @coaching_program_enrollment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @coaching_program_enrollment.update(coaching_program_enrollment_params)
      render json: @coaching_program_enrollment
    else
      render json: { errors: @coaching_program_enrollment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @coaching_program_enrollment.destroy
      render json: { message: "Coaching Program Enrollment deleted successfully." }, status: :ok
    else
      render json: { errors: @coaching_program_enrollment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def coaching_program_enrollment_params
    params.require(:coaching_program_enrollment).permit(:company_program_id, :user_id, :status)
  end

  def find_coaching_program_enrollment
    @coaching_program_enrollment = current_user.coaching_program_enrollments.find_by(id: params[:id])
    render json: { error: "Coaching Program Enrollment not found." }, status: :not_found if @coaching_program_enrollment.nil?
  end
end
