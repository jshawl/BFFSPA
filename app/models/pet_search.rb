class PetSearch

    def initialize(params)
        @query = filter_params(params)

    end

    def pets
        @pets =   Pet.where(@query).order('random()').limit(5)
        if @pets.count == 0
            #will fix the algorthem to pop items at the right order for maximum results
            @pets =  Pet.order('random()').limit(5)
        end
        @pets
    end

    private

    def filter_params(params)
        results = params.slice(:pet_type, :breed, :sex, :color, :size, :age, :energy, :kid_friendly)
        return results.compact
    end
end
