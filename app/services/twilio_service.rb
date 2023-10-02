class TwilioService
  def self.send_sms(to, incident)
    message = "Incident Alert! Description: #{incident.description}, Created At: #{incident.created_at}"
    client = Twilio::REST::Client.new(Rails.application.credentials.dig(:twilio, :account_sid), 
                                      Rails.application.credentials.dig(:twilio, :auth_token))
    client.messages.create(
      from: Rails.application.credentials.dig(:twilio, :phone_number), # Your Twilio number
      to: to,
      body: message
    )
  end
end
