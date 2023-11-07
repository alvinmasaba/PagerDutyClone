class Api::V1::TeamMembersController < ApplicationController
  # before_action :authenticate_user!, except: [:index, :show]
  before_action :set_team_member, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  # GET /team_members
  def index
    # page = params[:page] || 1
    # per_page = 5
    @team_members = TeamMember.all
    @total_team_members = TeamMember.all.count

    team_member_data = @team_members.map do |team_member|
      {
        id: team_member.id,
        first_name: team_member.first_name,
        last_name: team_member.last_name,
        email: team_member.email,
        number: team_member.number,
        avatar: team_member.avatar,
        on_call: team_member.on_call
      }
    end

    @on_call = TeamMember.on_call.count
    @off_duty = TeamMember.all.count - @on_call

    render json: { team_members: team_member_data, total_team_members: @total_team_members,
                   on_call: @on_call, off_duty: @off_duty }
  end

  # GET /team_members/1
  def show
    render json: @team_member
  end

  # POST /team_members
  def create
    @team_member = TeamMember.new(team_member_params)
    if @team_member.save
      # send_alerts(@team_member.assigned_to_id) if @team_member.assigned_to_id
      render json: @team_member, status: :created, location: api_v1_incident_url(@team_member)
    else
      render json: { errors: @team_member.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /team_members/1
  def update
    if @team_member.update(team_member_params)
      render json: @team_member
    else
      render json: { errors: @team_member.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /team_members/1
  def destroy
    @team_member.destroy
    render json: { message: 'Team member successfully deleted' }, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_team_member
    @team_member = TeamMember.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def team_member_params
    params.require(:team_member).permit(:first_name, :last_name, :email, :number, :avatar)
  end

  # Handle record not found error
  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end
end
