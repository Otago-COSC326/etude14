class GroupsController < SecuredController

  respond_to :json

  def index
    respond_with current_account.groups.order(:name)
  end

  def create
    group = current_account.groups.create group_params
    if group.persisted?
      html_content = render_to_string partial: '/partials/group_item', locals: {group: group}, formats: :html
      render json: {group: group, html: html_content}
    else
      response.status = 400
      render partial: '/partials/error_list', object: group.errors, formats: :html
    end
  end

  def update
    group = Group.find_by_id(params[:id])
    if group.nil?
      render status: 400
    else
      group.update_attributes group_params
      if group.errors.empty?
        respond_with nil
      else
        response.status = 400
        render partial: '/partials/error_list', object: group.errors, formats: :html
      end
    end
  end

  def destroy
    group = Group.find_by_id(params[:id])
    if group.nil?
      render status: 400
    else
      if group.contacts.count != 0
        default_group = Group.find_by_name('All')
        Contact.where(group: group).all.each do|contact|
          contact.group = default_group
          contact.save! #not very good to update here.
          default_group.contacts << contact
          default_group.save!
        end
      end
      group.reload.destroy!
      respond_with nil
    end
  end

  def group_params
    params.require(:group).permit(:name)
  end

end