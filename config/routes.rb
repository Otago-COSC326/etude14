Rails.application.routes.draw do
  devise_for :accounts

  authenticated :account do
    root to: 'home#index', as: 'authenticated_root'
  end

  devise_scope :account do
    resources :groups, except: [:edit, :new], controller: 'groups'
    resources :contacts, except: [:index]
    get '/contacts/delete/:id', to: 'contacts#delete', as: 'contacts_get_delete'
    root 'devise/sessions#new'
  end
end
