class CreateShelters < ActiveRecord::Migration
  def change
    create_table :shelters do |t|
        t.string :name
        t.text :address
        t.string :phone
        t.string :email
        t.string :banner
        t.text :story
        t.timestamps null: false
    end
  end
end
