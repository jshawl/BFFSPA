class AddShelterToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :shelter, index: true
  end
end
