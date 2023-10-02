class IncidentsController < ApplicationController
  before_action :authenticate_user! 
  before_action :set_incident, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  # GET /incidents
  def index
    @incidents = Incident.all
    render json: @incidents
  end

  # GET /incidents/1
  def show
    render json: @incident
  end

  # POST /incidents
  def create
    @incident = Incident.new(incident_params)
    if @incident.save
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
end

