class Group < ActiveRecord::Base

  validates :name, presence: true, uniqueness: {scope: :account, case_sensitive: false}

  has_many :contacts
  belongs_to :account, counter_cache: true

  scope :with_account, ->(account) { where(account: account) }

end
