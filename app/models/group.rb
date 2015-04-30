class Group < ActiveRecord::Base

  has_many :contacts
  belongs_to :account, counter_cache: true
end
