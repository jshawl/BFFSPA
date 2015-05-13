class Shelter < ActiveRecord::Base

    has_many :pets
    has_many :users
end
