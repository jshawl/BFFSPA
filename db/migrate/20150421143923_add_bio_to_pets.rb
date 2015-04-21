class AddBioToPets < ActiveRecord::Migration
  def change
    add_column :pets, :bio, :text
  end
end
