class CreatePets < ActiveRecord::Migration
  def change
    create_table :pets do |t|
        t.string :name
        t.string :breed
        t.string :sex
        t.string :color
        t.string :size
        t.string :age
        t.integer :energy
        t.boolean :kid_friendly
        t.belongs_to :shelter
      t.timestamps null: false
    end
  end
end
