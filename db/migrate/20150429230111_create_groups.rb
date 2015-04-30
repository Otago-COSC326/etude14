class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name, null: false

      t.belongs_to :account
      t.integer :contacts_count, default: 0

      t.timestamps null: false
    end
  end
end