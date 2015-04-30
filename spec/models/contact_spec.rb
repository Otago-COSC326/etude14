require 'rails_helper'

RSpec.describe Contact, type: :model do

  describe 'group' do

    it 'should has many-one relationship' do
      group = create(:group)
      contact = create(:contact, group: group)

      group.reload
      contact.reload
      expect(contact.group).to eq group
      expect(group.contacts.include?(contact)).to be_truthy
    end
  end

  describe 'phones' do
    it 'should validate phone' do
      contact = create(:contact)
      contact.phones << 'test'
      contact.phones << '023111111'
      contact.save
      expect(contact.errors[:phones]).to be_truthy
      expect(contact.errors[:phones].size).to eq 2
    end
  end

  describe 'emails' do
    it 'should validate email' do
      contact = create(:contact)
      contact.emails << 'test'
      contact.emails << '023111111'
      contact.emails << ''
      contact.emails << ' '
      contact.emails << 'email@example.com'
      contact.save
      expect(contact.errors[:emails]).to be_truthy
      expect(contact.errors[:emails].size).to eq 4
    end
  end
end
