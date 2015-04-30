require 'rails_helper'

RSpec.describe Account, type: :model do

  describe 'group' do

    it 'should have one-many relationship' do
      account = create(:account)
      3.times do
        account.groups.create attributes_for(:group)
      end

      account.reload
      expect(account.groups.count).to eq 3

      account.groups.each do |group|
        expect(group.account).to eq account
      end
    end

  end
end
