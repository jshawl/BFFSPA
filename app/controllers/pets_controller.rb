class PetsController < ApplicationController
    before_action :find_pet, only: [:show, :edit, :update, :destroy]

    def index
        @pets = Pet.all()

    end

    def show
        @pet = Pet.find(params[:id])
    end

    def edit

    end

    def new
        @shelter = Shelter.find(params[:shelter_id])
        @pet = Pet.new()
    end

    def create
        @shelter = Shelter.find(params[:shelter_id])
        @pet = @shelter.pets.new(pet_params)

        if @pet.save?
            redirect_to @pet
        else
            show :new
        end
    end

    def update

        if (@pet.update(pet_params))
            redirect_to @pet
        else
            show :edit
        end


    end



    private

    def pet_params
        params.require(:pet).permit(:name, :breed,  :sex, :color, :size, :age, :energy, :kid_friendly, :bio, :picture_url)
    end
    def find_pet
        if !params[:shelter_id]
            @pet = Pet.find(params[:id])
        else
            @pet = Pet.find_by(shelter_id: params[:shelter_id], id: params[:id])
        end

    end

end