module ApplicationHelper

  def form_error_messages!(resource)
    return '' if resource.errors.empty?

    messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join

    html = <<-HTML
    <div class="alert alert-danger">
      <ul>#{messages}</ul>
    </div>
    HTML

    html.html_safe
  end
end
