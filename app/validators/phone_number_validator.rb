class PhoneNumberValidator < ActiveModel::EachValidator

  def validate_each(record, attribute, values)

      values.each do|value|
        begin
          PhoneValidator::Validator.validate(value)
        rescue PhoneValidator::Validator::ValidationError => e
          record.errors[attribute] << (options[:message] || "#{value}: #{e.message}")
        end
      end

  end
end