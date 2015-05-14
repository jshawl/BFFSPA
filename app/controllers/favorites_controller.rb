class FavoritesController < ApplicationController
  before_action :authenticate_user!
  # before any "favoriting" action happens, the above line will authenticate the user.
    def index
     @pets = current_user.pets
    end

    def create
      @pet = Pet.find(params[:pet][:id])
      @favorite  = Favorite.find_or_create_by(user_id: current_user.id, pet_id: @pet.id)
      respond_to do |format|
        format.html {redirect_to match_url(@pet.id)}
        format.json {render json: current_user.favorites.count}
      end

    end

end

