Rails.application.routes.draw do
  resources :links do
    collection do
      post :load  
    end
  end
end
