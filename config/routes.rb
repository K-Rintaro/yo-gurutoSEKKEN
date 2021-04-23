Rails.application.routes.draw do
  root to: 'toppages#index'
  
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get 'signup', to: 'users#new'
  get 'drives', to: 'drives#index'
  post 'drives', to: 'logs#create'
  post 'authorize', to: 'users#update'
  get 'authorize', to: 'users#hello'
  
  resources :logs, only: [:create]
  resources :users, only: [:show, :create, :update, :edit, :hello]
end