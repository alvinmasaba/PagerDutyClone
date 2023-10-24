class Api::V1::TeamMembersController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_team_member, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  # GET /team_members
  def index
    # page = params[:page] || 1
    # per_page = 5
    @team_members = TeamMember.all
    total_team_members = TeamMember.all.count

    render json: { team_members: @team_members, total_team_members: total_team_members }
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
      render json: @team_member, status: :created, location: @team_member
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
    params.require(:team_member).permit(:first_name, :last_name, :email, :number, :avatar, :oncall,
                                        :shift_start, :shift_end)
  end

  # Handle record not found error
  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end

end