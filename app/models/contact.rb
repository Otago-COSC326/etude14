class Contact < ActiveRecord::Base

  has_many :addresses
  belongs_to :group, counter_cache: true

  validates :phones, phone_number: true
  validates :emails, email: true

end
