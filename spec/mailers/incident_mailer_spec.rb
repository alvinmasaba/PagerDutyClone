require "rails_helper"

RSpec.describe IncidentMailer, type: :mailer do
  let(:team_member) { TeamMember.create!(first_name: 'John', last_name: 'Doe', email: 'test@example.com',
                                        number: 5555555555, oncall: true, avatar: 'image') }
  let(:valid_attributes) {
    { urgency: 'High', triggered: false, acknowledged: false, resolved: false, description: 'Test Description', assigned_to_id: team_member.id }
  }

  describe 'incident_alert' do
    let(:incident) { Incident.create! valid_attributes } # Ensure you have a factory for incident or create an incident manually
    let(:mail) { IncidentMailer.incident_alert(incident) }

    it 'renders the headers' do
      expect(mail.subject).to eq('New Incident Assigned')
      expect(mail.to).to eq([team_member.email]) # Ensure incident has an assigned_to with an email
      expect(mail.from).to eq(['from@example.com'])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match(incident.description)
    end
  end
end
