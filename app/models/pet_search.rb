class PetSearch

    def initialize(params)
        query = filter_params(params)
        @pets =   Pet.where(query).order('random()').limit(5)
    end

    def pets
        @pets
    end

    private

    def filter_params(params)
        results = params.slice(:pet_type, :breed, :sex, :color, :size, :age, :energy, :kid_friendly)
        return results.compact

    end
end
