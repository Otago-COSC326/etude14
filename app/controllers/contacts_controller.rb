class ContactsController < SecuredController

  def show
    @contact = Contact.find_by_id(params[:id])
  end

  def new
    @contact = Contact.new
  end

  def create
    group = Group.find_by_id(contact_params[:group_id])
    @contact = group.contacts.create contact_params
    @contact.save
    if @contact.persisted?
      redirect_to contact_url @contact
    else
      render 'contacts/new'
    end
  end

  def edit
    @contact = Contact.find_by_id(params[:id])
  end

  def update
    @contact = Contact.find_by_id(params[:id])
    @contact.update_attributes contact_params
    if @contact.errors.empty?
      redirect_to contact_url @contact
    else
      render 'contacts/new'
    end
  end

  def destroy
    contact = Contact.find_by_id(params[:id])
    if contact.nil?
      render status: 400
    else
      contact.destroy!
      render json: {}
    end
  end

  def delete
    contact = Contact.find_by_id(params[:id])
    contact.destroy! if contact
    redirect_to root_path
  end

  def contact_params
    params.require(:contact).permit(:name, :group_id, :emails => [], :phones => [])
  end

end