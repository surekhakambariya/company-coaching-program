class Admin::UsersController < ApplicationController
  before_action :find_user, only: %i[show update destroy]

  def index
    @users = User.all
    if params[:role]
      @users = @users.with_role(params[:role])
    end
    @users = @users.where(company_id: params[:company_id]) if params[:company_id]
    if @users
      @users = @users.map do |user|
        user.as_json(only: %i[id email company_id]).merge(roles: user.roles.pluck(:name))
      end
      render json: @users
    else
      render json: { error: "No users found" }, status: :not_found
    end
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.assign_default_role(params[:role])
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @user.destroy
      render json: { message: "User deleted successfully" }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def get_current_user
    render json: current_user.as_json(only: %i[id email company_id]).merge(
      roles: current_user.roles.pluck(:name)
    )
  end

  def coach_programs
    if current_user.coach?
      c_programs = current_user.coaching_programs.map { |coaching_program| coaching_program.as_json.merge(user_count: coaching_program.company_programs.map { |cp| cp.coaching_program_enrollments.count }.sum) }
      render json: { coaching_programs: c_programs }
    else
      render json: { coaching_programs: [] }
    end
  end

  def coaching_programs
    programs = []
    enrolled_programs = []
    if current_user.employee?
      company = current_user.company
      programs = company.company_programs if company.present?
      enrolled_programs = current_user.coaching_program_enrollments.as_json(include: { company_program: { include: %i[coach coaching_program] } })
      render json: { company_programs: programs.as_json(include: %i[coaching_program coach]), enroll_programs: enrolled_programs }
    else
      render json: { company_programs: programs, enroll_programs: current_user.coaching_program_enrollments }
    end
  end

  def join_company_program
    if current_user.coaching_program_enrollments.create(company_program_id: params[:company_program_id])
      render json: { message: "Enrolled successfully" }, status: :ok
    else
      render json: { errors: "Failed to enroll" }, status: :unprocessable_entity
    end
  end

  def leave_company_program
    enroll = current_user.coaching_program_enrollments.find_by(id: params[:id])
    if enroll.update(status: :leave)
      render json: { message: "Program leave successfully" }, status: :ok
    else
      render json: { errors: "Failed to leave" }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :company_id)
  end

  def find_user
    @user = User.find_by(id: params[:id])
    render json: { error: "User not found" }, status: :not_found if @user.nil?
  end
end
