class TeamMember < ApplicationRecord
  has_many :incidents, foreign_key: 'assigned_to_id', dependent: :nullify
  has_many :shifts, foreign_key: 'team_member_id', dependent: :nullify
  
  # Returns array of all on call team members
  scope :on_call, lambda {
    joins(:shifts).where("shifts.shift_start <= ? AND shifts.shift_end >= ?", Time.now, Time.now)
  }

  # Checks if individual is on call
  def on_call
    return false if shifts.active.empty?

    true
  end
end
