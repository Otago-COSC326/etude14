class Contact < ActiveRecord::Base

  has_many :addresses
  belongs_to :group, counter_cache: true

  validates :name, presence: true
  validates :phones, phone_number: true
  validates :emails, email: true

  def self.search(search_query, group_id, account)
    account = Account.setup_account account
    query = Contact
    if group_id
      query = query.where(group_id: group_id)
    else
      query = query.where(group_id: account.groups.first.id)
    end

    if search_query
      query = query.where(':search_query = ANY(emails) or :search_query = ANY(phones) or name LIKE(:name_query)',
                          {search_query: search_query , name_query: "%#{search_query}%"})
    end
    query.order(:name)
  end

end
