class AddPictureToPets < ActiveRecord::Migration
  def change
    add_column :pets, :picture_url, :string
  end
end
