require 'base64'
require 'uri'
require 'net/http'

class Url < ApplicationRecord
  after_create :set_shortened_url
  validates :original, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp, message: 'must be a valid URL' }
  validate :validate_url_format

  def set_shortened_url
    self.shortened = "#{ENV['DOMAIN']}/#{Base64.urlsafe_encode64(id.to_s).delete('=')}"
    save!
  end

  private

  # Strict URL format validation
  def validate_url_format
    uri = URI.parse(original)
    unless uri.is_a?(URI::HTTP) && uri.host.present?
      errors.add(:original, 'must be a valid URL with http:// or https://')
    end
  rescue URI::InvalidURIError
    errors.add(:original, 'is not a valid URL')
  end
end
