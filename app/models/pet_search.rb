class PetSearch

    def initialize(params)
        @query = filter_params(params)

    end

    def pets
        @pets =   Pet.where(@query).order('random()').limit(5)
        if @pets.count == 0
            newQuery = @query.slice(:pet_type)

                @pets =  Pet.where(newQuery).order('random()').limit(5)
        end
        @pets
    end

    private

    def filter_params(params)
        results = params.slice(:pet_type, :breed, :sex, :color, :size, :age, :energy, :kid_friendly)
        return results.compact
    end
end
