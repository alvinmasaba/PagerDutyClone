require 'rails_helper'

RSpec.describe IncidentsController, type: :controller do
  include Devise::Test::ControllerHelpers  # Include Devise test helpers
  let(:user) { User.create!(email: 'test@example.com', password: 'password') }  # Create a user
  
  before(:each) do
    sign_in user
  end

  # Create a TeamMember before the tests
  let(:team_member) { TeamMember.create!(first_name: 'John', last_name: 'Doe', email: 'test@example.com',
                                        number: 5555555555, oncall: true, avatar: 'image') }

  let(:valid_attributes) {
    { urgency: 'High', triggered: false, acknowledged: false, resolved: false, description: 'Test Description', assigned_to_id: team_member.id }
  }

  let(:invalid_attributes) {
    { urgency: nil, description: nil }
  }

  describe "GET #index" do
    it "returns a success response" do
      incident = Incident.create! valid_attributes
      get :index, params: {}
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      incident = Incident.create! valid_attributes
      get :show, params: { id: incident.to_param }
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new Incident" do
        expect {
          post :create, params: { incident: valid_attributes }
        }.to change(Incident, :count).by(1)
      end

      it "renders a JSON response with the new incident" do
        post :create, params: { incident: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid parameters" do
      it "does not create a new Incident" do
        expect {
          post :create, params: { incident: invalid_attributes }
        }.to change(Incident, :count).by(0)
      end

      it "renders a JSON response with errors for the new incident" do
        post :create, params: { incident: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "PATCH #update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { urgency: 'Low' }
      }

      it "updates the requested incident" do
        incident = Incident.create! valid_attributes
        patch :update, params: { id: incident.to_param, incident: new_attributes }
        incident.reload
        expect(incident.urgency).to eq('Low')
      end

      it "renders a JSON response with the incident" do
        incident = Incident.create! valid_attributes
        patch :update, params: { id: incident.to_param, incident: valid_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the incident" do
        incident = Incident.create! valid_attributes
        patch :update, params: { id: incident.to_param, incident: invalid_attributes }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested incident" do
      incident = Incident.create! valid_attributes
      expect {
        delete :destroy, params: { id: incident.to_param }
      }.to change(Incident, :count).by(-1)
    end
  end
end