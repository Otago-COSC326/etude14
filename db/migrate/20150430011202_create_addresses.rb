class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :line1, null: false
      t.string :line2
      t.string :suburb
      t.string :city
      t.string :post_code
      t.string :country

      t.belongs_to :contacts

      t.timestamps null: false
    end
  end
end
