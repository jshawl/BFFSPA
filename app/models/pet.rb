class Pet < ActiveRecord::Base

    belongs_to :shelter
    has_many :favorites
    scope :dog, -> { where(pet_type: 'dog') }
    scope :cat, -> { where(pet_type: 'cat') }
    scope :other, -> { where(pet_type: 'other') }


end
