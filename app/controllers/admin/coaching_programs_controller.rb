class Admin::CoachingProgramsController < ApplicationController
  before_action :find_coaching_program, only: %i[show update destroy]

  def index
    @coaching_programs = CoachingProgram.all.order(created_at: :desc)
    if params[:company_id]
      @coaching_programs = @coaching_programs.where(user_id: params[:company_id])
    end
    if @coaching_programs
      render json: @coaching_programs.as_json(include: :coach)
    else
      render json: { error: "No coaching programs found" }, status: :not_found
    end
  end

  def show
    render json: @coaching_program
  end

  def create
    @coaching_program = current_user.coaching_programs.new(coaching_program_params)
    if @coaching_program.save
      render json: @coaching_program, status: :created
    else
      render_error(@coaching_program)
    end
  end

  def update
    if @coaching_program.update(coaching_program_params)
      render json: @coaching_program
    else
      render_error(@coaching_program)
    end
  end

  def destroy
    if @coaching_program.destroy
      render json: { message: "Coaching Program deleted successfully." }, status: :ok
    else
      render_error(@coaching_program)
    end
  end

  private

  def render_error(resource)
    render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
  end

  def coaching_program_params
    params.require(:coaching_program).permit(:name, :user_id, :description, :coach_id)
  end

  def find_coaching_program
    @coaching_program = CoachingProgram.find_by(id: params[:id])
    render json: { error: "Coaching program not found" }, status: :not_found if @coaching_program.nil?
  end
end
