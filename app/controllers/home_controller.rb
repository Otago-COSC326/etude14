class HomeController < SecuredController

  def index
    @data = {current_group: nil, contacts: []}
    group_id = params[:group_id]
    if group_id
      @data[:current_group] = Group.find_by_id(group_id)
      if @data[:current_group]
        @data[:contacts] = @data[:current_group].contacts.order(:name)
      end
    else
      if current_account.groups.count == 0
        current_account.groups.create name: 'All'
        current_account.reload
      end
      @data[:contacts] = current_account.groups.first.contacts.order(:name)
    end
  end
  
end