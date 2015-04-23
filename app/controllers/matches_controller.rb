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
        @pet = Pet.order('random()').first
        redirect_to match_path @pet

    end


end