class AdminController < ApplicationController
  before_action :authenticate_user!  # Ensure the user is signed in
  before_action :authorize_admin     # Ensure the user has admin privileges

  def index
    # This could be the main dashboard or overview for the admin
  end

  private

  def authorize_admin
    redirect_to root_path, alert: "Access denied." unless current_user&.admin?
  end
end
