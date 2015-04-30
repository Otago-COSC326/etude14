require 'rails_helper'

RSpec.describe Group, type: :model do

  describe 'contacts' do

    it 'should have one-many relationship' do
      group = create(:group)
      3.times do
        group.contacts.create attributes_for(:contact)
      end

      group.reload
      expect(group.contacts.size).to eq 3

      group.contacts.each do|contact|
        expect(contact.group).to eq group
      end
    end
  end
end
