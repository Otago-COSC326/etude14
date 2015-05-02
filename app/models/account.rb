class Account < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :groups

  def self.setup_account account
    if account.groups.count == 0
      account.groups.create name: 'All'
      account.reload
    end
    account
  end

end
