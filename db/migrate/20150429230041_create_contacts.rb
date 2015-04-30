class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name, null: false
      t.string :emails, array: true, default: []
      t.string :phones, array: true, default: []

      t.integer :addresses_count, default: 0
      t.belongs_to :group

      t.timestamps null: false
    end
  end
end
