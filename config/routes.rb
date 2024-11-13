Rails.application.routes.draw do
  root "home#index"
  devise_for :users, controllers: {
    sessions: "users/sessions"
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :admin do
    root to: "admin#index" # The admin dashboard
    resources :companies
    resources :coaching_programs
    resources :company_programs
    resources :coaching_program_enrollments
    resources :users
  end
  post "/users/join_company_program", to: "admin/users#join_company_program"
  post "/users/leave_company_program", to: "admin/users#leave_company_program"
  get "/users/coaching_programs", to: "admin/users#coaching_programs"
  get "/users/coach_programs", to: "admin/users#coach_programs"
  get "/users/current_user", to: "admin/users#get_current_user"
  get "*path", to: "home#index", constraints: ->(req) { req.format.html? }
end
