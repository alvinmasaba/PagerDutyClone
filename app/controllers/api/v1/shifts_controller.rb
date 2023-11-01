class Api::V1::ShiftsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_shift, only: [:show, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def index
    # page = params[:page] || 1
    # per_page = 5
    @shifts = Shift.all
    @active = Shift.active.count

    render json: { shifts: @shifts, active: @active }
  end

  def show
    render json: @shift
  end

  def create
    @shift = Shift.new(shift_params)

    if @shift.save
      render json: @shift, status: :created, location: @shift
    else
      render json: { errors: @shift.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @shift.update(shift_params)
      render json: @shift
    else
      render json: { errors: @shift.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @shift.destroy
    render json: { message: 'Shift successfully deleted' }, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_shift
    @shift = Shift.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def shift_params
    params.require(:shift).permit(:shift_start, :shift_end, :team_member_id)
  end

  # Handle record not found error
  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end
end
