class Pet < ActiveRecord::Base
    belongs_to :shelter
    has_many :favorites
    scope :dog, -> { where(pet_type: 'dog') }
    scope :cat, -> { where(pet_type: 'cat') }
    scope :other, -> { where(pet_type: 'other') }

    def self.match_by(params)
        query = self.filter_params(params)
       return Pet.where(query).order('random()').limit(5)
    end

    private

    def self.filter_params(params)
        results = params.slice(:pet_type, :breed, :sex, :color, :size, :age, :energy, :kid_friendly)
        return results.compact
    end
end
