class Api::V1::IncidentsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_incident, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  # GET /incidents
  def index
    page = params[:page] || 1
    per_page = 5
    @incidents = Incident.all.page(page).per(per_page)
    
    total_incidents = Incident.all.count
    triggered_incidents = Incident.triggered.count
    resolved_incidents = Incident.resolved.count
    acknowledged_incidents = Incident.acknowledged.count

    render json: { 
                  incidents: @incidents, total_incidents: total_incidents,
                  triggered_incidents: triggered_incidents, 
                  acknowledged_incidents: acknowledged_incidents,
                  resolved_incidents: resolved_incidents
                }
  end

  # GET /incidents/1
  def show
    render json: @incident
  end

  # POST /incidents
  def create
    @incident = Incident.new(incident_params)
    if @incident.save
      send_alerts(@incident.assigned_to_id) if @incident.assigned_to_id
      render json: @incident, status: :created, location: @incident
    else
      render json: { errors: @incident.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /incidents/1
  def update
    if @incident.update(incident_params)
      render json: @incident
    else
      render json: { errors: @incident.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /incidents/1
  def destroy
    @incident.destroy
    render json: { message: 'Incident successfully deleted' }, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_incident
    @incident = Incident.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def incident_params
    params.require(:incident).permit(:urgency, :triggered, :acknowledged, :resolved, :description, :assigned_to_id)
  end

  # Handle record not found error
  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end

  def send_alerts(id)
    begin
      IncidentMailer.incident_alert(@incident).deliver_now
      team_member = TeamMember.find(id)
      TwilioService.send_sms(team_member.number, @incident)
    rescue => e
      # Log the error message and continue
      Rails.logger.error "Error sending alerts: #{e.message}"
    end
  end  
end

