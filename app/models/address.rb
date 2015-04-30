class Address < ActiveRecord::Base

  belongs_to :contact, counter_cache: true
end
