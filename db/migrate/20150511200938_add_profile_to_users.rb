class AddProfileToUsers < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :phone, :string
    add_column :users, :about, :text
    add_column :users, :role, :integer, default: 0, null: false
  end
end
