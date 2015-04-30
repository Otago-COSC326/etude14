Rails.application.routes.draw do
  devise_for :accounts

  root 'home#index'
end
