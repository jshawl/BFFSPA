class MatchesController < ApplicationController

    def index

    end

    def show
        @pet = Pet.find(params[:id])
        @shelter = @pet.shelter
        if current_user
            @fav = true if  Favorite.find_by(user_id: current_user.id, pet_id: @pet.id)
        end
        render layout: "match_layout"
    end

    def find
        search_results = PetSearch.new(filter_params)
       @pet = search_results.pets.first
       @shelter = @pet.shelter

         respond_to do |format|
            format.html {render :show, layout: "match_layout"}
            format.json {render json: search_results.pets.to_json}
        end
    end

    private
    def filter_params
        params.permit(:pet_type, :size, :sex)
    end

end