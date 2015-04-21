class Pet < ActiveRecord::Base
    belongs_to :shelter
    has_many :favorites
end
