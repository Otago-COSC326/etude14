class HomeController < SecuredController

  def index
    @data = {current_group: nil, contacts: []}
    @data[:contacts] = Contact.search params[:search], params[:group_id], current_account
    @data[:current_group] = Group.find_by_id(params[:group_id])
  end
  
end