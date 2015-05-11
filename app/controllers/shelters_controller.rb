class SheltersController < ApplicationController
    before_action :find_shelter, only: [:show, :edit, :update, :destroy]

    def index
        @shelters = Shelter.all
    end

    def show

    end

    def edit

    end

    def new
        @shelter = Shelter.new()
    end

    def create
         @shelter = Shelter.new(shelter_params)
        if @shelter.save
            redirect_to @shelter
        else
            show :new
        end
    end

    def update
        if (@shelter.update(shelter_params))
            redirect_to @shelter
        else
            show :edit
        end
    end

    private

    def shelter_params
        params.require(:shelter).permit(:name, :address,  :phone, :email, :banner, :story)
    end
    def find_shelter
            @shelter = Shelter.find(params[:id])
    end
end