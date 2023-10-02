# spec/services/twilio_service_spec.rb
require 'rails_helper'

RSpec.describe TwilioService do
  describe '.send_sms' do
    let(:team_member) { TeamMember.create!(first_name: 'John', last_name: 'Doe', email: 'test@example.com',
                                        number: 5555555555, oncall: true, avatar: 'image') }
    let(:incident) { Incident.create!(urgency: 'HIGH', description: 'Test Incident', created_at: Time.now,
                                      assigned_to_id: team_member.id) }
    let(:message) { "Incident Alert! Description: #{incident.description}, Created At: #{incident.created_at}" }
    let(:to) { TeamMember.find(incident.assigned_to_id).number }

    before do
      # Stub the Twilio Client messages create method
      allow_any_instance_of(Twilio::REST::Client).to receive_message_chain(:messages, :create)
    end

    it 'sends an SMS with the correct parameters' do
      expect_any_instance_of(Twilio::REST::Client).to receive_message_chain(:messages, :create)
        .with(
          from: Rails.application.credentials.dig(:twilio, :phone_number),
          to: to,
          body: message
        )

      described_class.send_sms(to, incident)
    end
  end
end
