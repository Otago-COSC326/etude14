class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, values)
    values.each do|value|
      unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
        record.errors[attribute] << (options[:message] || "#{value}: invalid email")
      end
    end
  end
end