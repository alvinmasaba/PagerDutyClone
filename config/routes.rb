Rails.application.routes.draw do
  devise_for :users
  
  # API routes should be in /api/v1
  namespace :api do
    namespace :v1 do
      resources :incidents
      resources :team_members
      resources :shifts
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
